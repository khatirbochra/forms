document.addEventListener('DOMContentLoaded', function() {
    
    const inputs = document.querySelectorAll('input, textarea, select');
    const progressBar = document.getElementById('progressBar');

    function updateProgress() {
        if (!progressBar) return;
        
        const requiredInputs = document.querySelectorAll('input[required], textarea[required]');
        let filledCount = 0;

        requiredInputs.forEach(input => {
            if (input.type === 'radio' || input.type === 'checkbox') {
                if (document.querySelector(`input[name="${input.name}"]:checked`)) {
                    filledCount++;
                }
            } else if (input.value.trim() !== '') {
                filledCount++;
            }
        });

        const progressPercentage = Math.round((filledCount / requiredInputs.length) * 100);
        progressBar.style.width = `${progressPercentage}%`;
    }

    inputs.forEach(input => {
        input.addEventListener('input', updateProgress);
        input.addEventListener('change', updateProgress);
    });

    const yesRadio = document.getElementById('prev_lead_yes');
    const noRadio = document.getElementById('prev_lead_no');
    const detailsGroup = document.getElementById('leadership_details_group');
    const detailsInput = document.getElementById('leadership_details');

    if (yesRadio && noRadio && detailsGroup) {
        detailsGroup.style.display = 'none';

        yesRadio.addEventListener('change', function() {
            if (this.checked) {
                detailsGroup.style.display = 'block';
                detailsInput.setAttribute('required', 'required');
            }
        });

        noRadio.addEventListener('change', function() {
            if (this.checked) {
                detailsGroup.style.display = 'none';
                detailsInput.removeAttribute('required');
                detailsInput.value = '';
            }
        });
    }

    const form = document.querySelector('form');
    const submitBtn = document.querySelector('.submit-btn');

    if (form) {
        form.addEventListener('submit', function(event) {
            const phoneInput = document.getElementById('phone');
            const phoneRegex = /^[0-9+\s-]{9,14}$/;

            if (phoneInput && !phoneRegex.test(phoneInput.value.trim())) {
                alert('يرجى إدخال رقم هاتف صحيح.');
                phoneInput.focus();
                event.preventDefault();
                return;
            }

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerText = '⏳ جاري إرسال البيانات...';
                submitBtn.style.opacity = '0.8';
                submitBtn.style.cursor = 'wait';
            }
        });
    }
});