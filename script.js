document.addEventListener('DOMContentLoaded', () => {
    // DOM-Elemente abrufen
    const plaintextInput = document.getElementById('plaintext');
    const ciphertextInput = document.getElementById('ciphertext');
    const shiftSlider = document.getElementById('shift');
    const shiftValueDisplay = document.getElementById('shift-value');
    const innerWheel = document.getElementById('inner-wheel');

    function caesarCipher(str, shift, mode) {
        if (mode === 'decrypt') {
            shift = (26 - shift) % 26;
        }

        return str.split('').map(char => {
            const charCode = char.charCodeAt(0);

            if (charCode >= 65 && charCode <= 90) {
                return String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
            }
            else if (charCode >= 97 && charCode <= 122) {
                return String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
            }
            else {
                return char;
            }
        }).join('');
    }

    function updateShiftDisplayAndWheel() {
        const shift = parseInt(shiftSlider.value, 10);
        shiftValueDisplay.textContent = shift;
        const angle = -(shift / 26) * 360;
        innerWheel.style.transform = `rotate(${angle}deg)`;
    }

    function handleEncrypt() {
        const shift = parseInt(shiftSlider.value, 10);
        const plaintext = plaintextInput.value;
        ciphertextInput.value = caesarCipher(plaintext, shift, 'encrypt');
    }

    function handleDecrypt() {
        const shift = parseInt(shiftSlider.value, 10);
        const ciphertext = ciphertextInput.value;
        plaintextInput.value = caesarCipher(ciphertext, shift, 'decrypt');
    }
    
    function handleShiftChange() {
        updateShiftDisplayAndWheel();
        handleEncrypt();
    }

    plaintextInput.addEventListener('input', handleEncrypt);
    ciphertextInput.addEventListener('input', handleDecrypt);
    shiftSlider.addEventListener('input', handleShiftChange);

    updateShiftDisplayAndWheel();
});