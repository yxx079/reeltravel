import django.core.exceptions
import django.core.validators
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.shortcuts import render, redirect
from django.template.loader import render_to_string
from django.urls import reverse
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode


from .forms import UserRegisterForm

UserModel = get_user_model()

def dashboard(request):
    return render(request, "users/dashboard.html")


def login_register(request):
    context = {'show_register_form': False}
    if request.method == 'POST':
        if 'sign_in' in request.POST:
            print(request.POST)
            email = request.POST['email']
            password = request.POST['password']
            user = authenticate(request, username=email, password=password)
            if user is not None:
                if user.is_active:
                    login(request, user)
                    return redirect('dashboard')
                else:
                    messages.error(request,
                                   'Your account is not activated. Please check your email for the activation link.')
            else:
                messages.error(request, 'login failed')
            return render(request, 'registration/login_register.html', context)
        elif 'sign_up' in request.POST:

            email = request.POST['email']
            try:
                django.core.validators.validate_email(email)
                if User.objects.filter(email=email).exists():
                    messages.error(request, 'The email address is already taken')
                    context['show_register_form'] = True
                else:
                    form = UserRegisterForm(request.POST)
                    if form.is_valid():
                        send_confirmation_email(request, form)
                        context['show_register_form'] = True
                        context['email_sent'] = True
                        return render(request, 'registration/login_register.html', context)

                    else:
                        context['register_form'] = form
                        context['show_register_form'] = True
            except django.core.exceptions.ValidationError:
                messages.error(request, 'Invalid email address')
    return render(request, 'registration/login_register.html', context)


def send_confirmation_email(request,form):
    email = form.cleaned_data['email']
    user = User(email=email, username=form.cleaned_data['username'])
    user.set_password(form.cleaned_data['password'])
    user.is_active = False
    user.save()

    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    domain = 'reeltravel.live'
    link = reverse('confirm_email', kwargs={'uidb64': uid, 'token': token})
    confirm_url = f'http://{domain}{link}'

    subject = 'Please confirm your email address'
    message = render_to_string('registration/email_confirmation.html', {
        'user': user,
        'confirm_url': confirm_url,
    })
    send_mail(subject, message, from_email=None, recipient_list=[email], fail_silently=False)
    print("Email sent to", email)


def confirm_email(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()

        # 设置用户的backend属性
        user.backend = 'django.contrib.auth.backends.ModelBackend'
        login(request, user)
        return redirect('dashboard')
    else:
        return render(request, 'registration/email_confirmation_error.html')
