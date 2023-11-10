const loginTemplate = `
    <div id="login-panel">
        <form>
            <h1>Logowanie</h1>
            <label>
                <span>Email: </span>
                <input type="text" id="email">
            </label>
            <label>
                <span>Hasło: </span>
                <input type="password" id="password">
            </label>
            <button id="auth-button">Zaloguj</button>
            <div class="small-text">
                Nie masz konta? <span role="link" id="auth-link" tabindex="0">Zarejestruj się</span>
            </div>
        </form>
    </div>
`;

const registerTemplate = `
    <div id="register-panel">
        <form>
            <h1>Rejestracja</h1>
            <label>
                <span>Email: </span>
                <input type="text" id="email">
            </label>
            <label>
                <span>Hasło: </span>
                <input type="password" id="password">
            </label>
            <label>
                <span>Powtórz hasło: </span>
                <input type="password" id="repeat-password">
            </label>
            <button id="auth-button">Rejestruj</button>
            <div class="small-text">
                Masz już konto? <span role="link" id="auth-link" tabindex="0">Zaloguj się</span>
            </div>
        </form>
    </div>
`;

export { loginTemplate, registerTemplate };
