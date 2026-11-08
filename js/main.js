// ==============================================================================
// Web3Forms Backend Configuration & Form Submission
// ------------------------------------------------------------------------------
// Access Key connected for Glyphic Studio contact form submissions via Web3Forms.
// ==============================================================================
const WEB3FORMS_ACCESS_KEY = "7826de46-0871-4591-bde2-61afb24d03b0";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const IS_BACKEND_CONNECTED = true;

let toastTimeout = null;

/**
 * Display the floating toast notification.
 * @param {boolean} isSuccess - Whether the action succeeded.
 * @param {string} message - Description message to display.
 * @param {string} [title] - Title for the notification.
 */
function showToast(isSuccess, message, title) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    const iconSpan = toast.querySelector('.material-symbols-outlined');
    const iconWrapper = iconSpan ? iconSpan.parentElement : toast.children[0];
    const titleEl = toast.querySelector('h4');
    const msgEl = toast.querySelector('p');

    if (isSuccess) {
        if (iconWrapper) {
            iconWrapper.className = 'w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-white flex-shrink-0';
        }
        if (iconSpan) {
            iconSpan.textContent = 'check';
        }
        if (titleEl) {
            titleEl.className = 'font-bold text-sm text-secondary-fixed';
            titleEl.textContent = title || 'Message Received';
        }
        if (msgEl) {
            msgEl.textContent = message || 'Thank you for reaching out! Your message has been received for this demo. Email delivery will be enabled soon.';
        }
    } else {
        if (iconWrapper) {
            iconWrapper.className = 'w-8 h-8 rounded-full bg-red-500/90 flex items-center justify-center text-white flex-shrink-0';
        }
        if (iconSpan) {
            iconSpan.textContent = 'error';
        }
        if (titleEl) {
            titleEl.className = 'font-bold text-sm text-red-300';
            titleEl.textContent = title || 'Submission Error';
        }
        if (msgEl) {
            msgEl.textContent = message || 'Please check the form for errors and try again.';
        }
    }

    if (toastTimeout) {
        clearTimeout(toastTimeout);
    }

    toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
    toast.classList.add('show');
    if (toast.style) {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
        toast.style.pointerEvents = 'auto';
    }

    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
        if (toast.style) {
            toast.style.transform = '';
            toast.style.opacity = '';
            toast.style.pointerEvents = '';
        }
    }, 6000);
}

/**
 * Validate phone number supporting international formats.
 * Accepts digits, optional leading '+', spaces, hyphens, dots, and parentheses.
 * Ensures an appropriate digit count (7 to 16 digits according to ITU-T E.164).
 * Returns true if valid or if empty (since phone is optional).
 */
function isValidPhoneNumber(phone) {
    if (!phone) return true; // Optional field
    const formatRegex = /^[+]?[\d\s().-]{7,25}$/;
    if (!formatRegex.test(phone)) return false;
    const digitCount = (phone.match(/\d/g) || []).length;
    return digitCount >= 7 && digitCount <= 16;
}

/**
 * Validate email format with standard email pattern.
 */
function isValidEmail(email) {
    if (!email) return false;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

/**
 * Show validation error for an input field.
 */
function setFieldError(inputEl, errorEl, message) {
    if (!inputEl || !errorEl) return;
    inputEl.classList.add('contact-input-error');
    inputEl.setAttribute('aria-invalid', 'true');
    errorEl.innerHTML = `<span class="material-symbols-outlined text-sm flex-shrink-0" aria-hidden="true">error</span><span>${message}</span>`;
    errorEl.classList.remove('hidden');
}

/**
 * Clear validation error for an input field.
 */
function clearFieldError(inputEl, errorEl) {
    if (!inputEl || !errorEl) return;
    inputEl.classList.remove('contact-input-error');
    inputEl.setAttribute('aria-invalid', 'false');
    errorEl.textContent = '';
    errorEl.classList.add('hidden');
}

/**
 * Show inline form status banner (success, demo notice, or error).
 */
function showStatusBanner(type, title, message) {
    const banner = document.getElementById('contact-status-banner');
    if (!banner) return;

    const iconEl = document.getElementById('status-banner-icon');
    const titleEl = document.getElementById('status-banner-title');
    const msgEl = document.getElementById('status-banner-message');

    banner.className = 'rounded-2xl p-4 transition-all duration-300 mb-2';

    if (type === 'success' || type === 'demo') {
        banner.classList.add('bg-secondary/10', 'border', 'border-secondary/30', 'text-custom-blue');
        if (iconEl) {
            iconEl.className = 'material-symbols-outlined text-2xl flex-shrink-0 text-secondary';
            iconEl.textContent = 'check_circle';
        }
        if (titleEl) {
            titleEl.className = 'font-bold text-sm text-secondary';
            titleEl.textContent = title || (type === 'success' ? 'Message Sent!' : 'Demo Submission');
        }
    } else {
        banner.classList.add('bg-red-50', 'border', 'border-red-200', 'text-red-900');
        if (iconEl) {
            iconEl.className = 'material-symbols-outlined text-2xl flex-shrink-0 text-red-600';
            iconEl.textContent = 'error';
        }
        if (titleEl) {
            titleEl.className = 'font-bold text-sm text-red-700';
            titleEl.textContent = title || 'Submission Error';
        }
    }

    if (msgEl) {
        msgEl.textContent = message;
    }

    banner.classList.remove('hidden');
}

/**
 * Hide inline form status banner.
 */
function hideStatusBanner() {
    const banner = document.getElementById('contact-status-banner');
    if (banner) {
        banner.classList.add('hidden');
    }
}

/**
 * Temporary Frontend Submission Handler (Demo Mode)
 * Simulates a realistic network flow with a brief delay without claiming email was sent.
 */
async function handleTemporarySubmission(formData) {
    // Realistic micro-delay to demonstrate loading state and verify non-blocking UI
    await new Promise(resolve => setTimeout(resolve, 800));

    return {
        success: true,
        message: "Thank you for reaching out! Your message has been received for this demo. Email delivery will be enabled soon."
    };
}

/**
 * Production Web3Forms Backend Submission Handler
 * Submits form data asynchronously to Web3Forms API with the verified Access Key.
 */
async function handleWeb3FormsSubmission(formData) {
    if (!WEB3FORMS_ACCESS_KEY) {
        throw new Error("Web3Forms access key is not configured.");
    }

    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('from_name', 'Glyphic Studio Website');

    // Set visitor's email as the Reply-To address so inquiries can be replied to directly
    const visitorEmail = formData.get('email');
    if (visitorEmail) {
        formData.append('replyto', visitorEmail);
    }

    if (!formData.get('subject')) {
        const name = formData.get('name') || 'Visitor';
        const service = formData.get('service') ? ` — ${formData.get('service')}` : '';
        formData.append('subject', `New enquiry from ${name}${service}`);
    }

    const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    });

    let result;
    try {
        result = await response.json();
    } catch (e) {
        throw new Error('Unable to connect to the submission server. Please try again.');
    }

    if (!response.ok || !result.success) {
        throw new Error(result.message || 'Submission failed. Please check your details and try again.');
    }

    return {
        success: true,
        message: result.message || "Thank you! Your message has been sent successfully. We will get back to you shortly."
    };
}

// ==============================================================================
// Contact Form Initialization & Event Listeners
// ==============================================================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    const nameInput = document.getElementById('contact-name');
    const companyInput = document.getElementById('contact-company');
    const emailInput = document.getElementById('contact-email');
    const phoneInput = document.getElementById('contact-phone');
    const serviceInput = document.getElementById('contact-service');
    const messageInput = document.getElementById('contact-message');

    const nameError = document.getElementById('contact-name-error');
    const companyError = document.getElementById('contact-company-error');
    const emailError = document.getElementById('contact-email-error');
    const phoneError = document.getElementById('contact-phone-error');
    const serviceError = document.getElementById('contact-service-error');
    const messageError = document.getElementById('contact-message-error');

    const submitBtn = document.getElementById('contact-submit-btn') || contactForm.querySelector('button[type="submit"]');
    const btnText = document.getElementById('submit-btn-text');
    const btnIcon = document.getElementById('submit-btn-icon');

    // Real-time error clearing upon user input
    if (nameInput) {
        nameInput.addEventListener('input', () => {
            if (nameInput.value.trim().length >= 2) {
                clearFieldError(nameInput, nameError);
            }
        });
    }

    if (emailInput) {
        emailInput.addEventListener('input', () => {
            if (isValidEmail(emailInput.value.trim())) {
                clearFieldError(emailInput, emailError);
            }
        });
    }

    if (phoneInput) {
        phoneInput.addEventListener('input', () => {
            const val = phoneInput.value.trim();
            if (!val || isValidPhoneNumber(val)) {
                clearFieldError(phoneInput, phoneError);
            }
        });
    }

    if (messageInput) {
        messageInput.addEventListener('input', () => {
            if (messageInput.value.trim().length >= 5) {
                clearFieldError(messageInput, messageError);
            }
        });
    }

    if (serviceInput) {
        serviceInput.addEventListener('change', () => {
            clearFieldError(serviceInput, serviceError);
        });
    }

    // Submit listener
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        hideStatusBanner();

        // 1. Trim input values
        const nameVal = nameInput ? nameInput.value.trim() : '';
        const companyVal = companyInput ? companyInput.value.trim() : '';
        const emailVal = emailInput ? emailInput.value.trim() : '';
        const phoneVal = phoneInput ? phoneInput.value.trim() : '';
        const serviceVal = serviceInput ? serviceInput.value.trim() : '';
        const messageVal = messageInput ? messageInput.value.trim() : '';

        // Reflect trimmed values back into inputs
        if (nameInput) nameInput.value = nameVal;
        if (companyInput) companyInput.value = companyVal;
        if (emailInput) emailInput.value = emailVal;
        if (phoneInput) phoneInput.value = phoneVal;
        if (messageInput) messageInput.value = messageVal;

        // 2. Form Validation
        let isValid = true;
        let firstInvalidField = null;

        // Validate Full Name (required, min 2 characters)
        if (!nameVal) {
            setFieldError(nameInput, nameError, 'Please enter your name.');
            isValid = false;
            if (!firstInvalidField) firstInvalidField = nameInput;
        } else if (nameVal.length < 2) {
            setFieldError(nameInput, nameError, 'Name must be at least 2 characters long.');
            isValid = false;
            if (!firstInvalidField) firstInvalidField = nameInput;
        } else {
            clearFieldError(nameInput, nameError);
        }

        // Validate Email (required, valid format)
        if (!emailVal) {
            setFieldError(emailInput, emailError, 'Please enter your email address.');
            isValid = false;
            if (!firstInvalidField) firstInvalidField = emailInput;
        } else if (!isValidEmail(emailVal)) {
            setFieldError(emailInput, emailError, 'Please enter a valid email address (e.g. name@company.com).');
            isValid = false;
            if (!firstInvalidField) firstInvalidField = emailInput;
        } else {
            clearFieldError(emailInput, emailError);
        }

        // Validate Phone (optional, but if filled must be a valid telephone format)
        if (phoneVal && !isValidPhoneNumber(phoneVal)) {
            setFieldError(phoneInput, phoneError, 'Please enter a valid phone number (e.g. +1 555-000-0000).');
            isValid = false;
            if (!firstInvalidField) firstInvalidField = phoneInput;
        } else {
            clearFieldError(phoneInput, phoneError);
        }

        // Validate Message (required, min 5 characters)
        if (!messageVal) {
            setFieldError(messageInput, messageError, 'Please enter your message.');
            isValid = false;
            if (!firstInvalidField) firstInvalidField = messageInput;
        } else if (messageVal.length < 5) {
            setFieldError(messageInput, messageError, 'Message must be at least 5 characters long.');
            isValid = false;
            if (!firstInvalidField) firstInvalidField = messageInput;
        } else {
            clearFieldError(messageInput, messageError);
        }

        // If any validation failed, focus the first invalid field and halt
        if (!isValid) {
            if (firstInvalidField) {
                firstInvalidField.focus();
            }
            return;
        }

        // 3. Submit Button Loading State
        const originalText = btnText ? btnText.textContent : 'Send Message';
        const originalIcon = btnIcon ? btnIcon.textContent : 'send';

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.classList.add('cursor-wait', 'opacity-75');
            submitBtn.setAttribute('aria-busy', 'true');
        }
        if (btnText) btnText.textContent = 'Sending...';
        if (btnIcon) {
            btnIcon.textContent = 'progress_activity';
            btnIcon.classList.add('animate-spin');
        }

        try {
            // Prepare FormData
            const formData = new FormData(contactForm);

            // 4. Submission (Temporary Frontend or Web3Forms Backend)
            let result;
            if (IS_BACKEND_CONNECTED && WEB3FORMS_ACCESS_KEY) {
                result = await handleWeb3FormsSubmission(formData);
            } else {
                result = await handleTemporarySubmission(formData);
            }

            if (result.success) {
                const isProduction = IS_BACKEND_CONNECTED && WEB3FORMS_ACCESS_KEY;
                const feedbackTitle = isProduction ? 'Message Sent!' : 'Message Received (Demo Mode)';
                const feedbackMsg = result.message || (isProduction
                    ? "Thank you! Your message has been sent successfully. We will get back to you shortly."
                    : "Thank you for reaching out! Your message has been received for this demo. Email delivery will be enabled soon.");

                // Show status banner inside form card
                showStatusBanner(
                    isProduction ? 'success' : 'demo',
                    feedbackTitle,
                    feedbackMsg
                );

                // Show floating toast notification
                showToast(
                    true,
                    feedbackMsg,
                    feedbackTitle
                );

                // Reset form fields
                contactForm.reset();

                // Clear any lingering error states
                clearFieldError(nameInput, nameError);
                clearFieldError(companyInput, companyError);
                clearFieldError(emailInput, emailError);
                clearFieldError(phoneInput, phoneError);
                clearFieldError(serviceInput, serviceError);
                clearFieldError(messageInput, messageError);
            } else {
                throw new Error(result.message || 'Submission failed');
            }
        } catch (error) {
            console.error('Contact form submission error:', error);
            const errorMsg = error.message || 'Something went wrong while processing your request. Please try again.';
            showStatusBanner(
                'error',
                'Submission Failed',
                errorMsg
            );
            showToast(
                false,
                errorMsg,
                'Submission Failed'
            );
        } finally {
            // 5. Restore Submit Button State
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.classList.remove('cursor-wait', 'opacity-75');
                submitBtn.removeAttribute('aria-busy');
            }
            if (btnText) btnText.textContent = originalText;
            if (btnIcon) {
                btnIcon.textContent = originalIcon;
                btnIcon.classList.remove('animate-spin');
            }
        }
    });
}
