export default class LoginView {
  public static showLoginView(): void {
    const loginView = document.createElement('div');
    const loginWindow = document.createElement('div');

    loginView.classList.add('bg-black');
    loginView.classList.add('m-0');
    loginView.classList.add('opacity-75');
    loginView.classList.add('absolute');
    loginView.classList.add('inset-x-0');
    loginView.classList.add('inset-y-0');

    loginWindow.classList.add('bg-white');
    loginWindow.classList.add('w-2/4');
    loginWindow.classList.add('h-2/4');
    loginWindow.classList.add('text-center');
    loginWindow.classList.add('m-auto');
    loginWindow.classList.add('absolute');
    loginWindow.classList.add('top-1/4');
    loginWindow.classList.add('left-1/4');

    loginView.appendChild(loginWindow);
    document.body.appendChild(loginView);
  }
}