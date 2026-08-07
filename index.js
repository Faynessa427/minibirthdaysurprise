
        function isValidCssColor(color) {
            const test = document.createElement('div');
            test.style.color = '';
            test.style.color = color;
            return test.style.color !== '';
        }

        function saveData() {
            const name = document.getElementById('name').value.trim();
            const color = document.getElementById('color').value.trim();

            if (!name || !color) {
                document.getElementById('colorError').textContent = 'Please enter both name and color.';
                return;
            }

            if (!isValidCssColor(color)) {
                document.getElementById('colorError').textContent = 'Color invalid. Enter a valid color.';
                return;
            }

            document.getElementById('colorError').textContent = '';
            localStorage.setItem('username', name);
            localStorage.setItem('favColor', color);
            window.location.href = 'openme.html';
        };