export class UtilsBaseExceptionLangValidator {
  static exceptionUsername() {
    return `username đăng nhập`;
  }

  static exceptionPhoneNumber() {
    return `Số điện thoại`;
  }

  static exceptionPassword() {
    return `Mật khẩu đăng nhập`;
  }

  static exceptionName(name: string) {
    return `Tên ${name}`;
  }

  static exceptionEmail() {
    return `Email đăng nhập`;
  }
}
