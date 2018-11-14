import * as React from "react";

export function progressBar(level: string): JSX.Element {
  switch (level) {
    case "very weak": {
      return (
        <div className="bar-wrapper weak">
          <div className="fas fa-exclamation-triangle icon" />
          <div className="level">Very weak</div>
          <div className="progress-bar">
            <div className="filler very-weak" />
          </div>
        </div>
      );
    }
    case "weak": {
      return (
        <div className="bar-wrapper weak">
          <div className="fas fa-exclamation-triangle icon" />
          <div className="level">Weak</div>
          <div className="progress-bar">
            <div className="filler weak" />
          </div>
        </div>
      );
    }
    case "strong": {
      return (
        <div className="bar-wrapper strong">
          <div className="fas fa-check-circle icon" />
          <div className="level">Strong</div>
          <div className="progress-bar">
            <div className="filler strong" />
          </div>
        </div>
      );
    }
    case "very strong": {
      return (
        <div className="bar-wrapper strong">
          <div className="fas fa-check-circle icon" />
          <div className="level">Very strong</div>
          <div className="progress-bar">
            <div className="filler very-strong" />
          </div>
        </div>
      );
    }
    case "bad": {
      return (
        <div className="bar-wrapper bad">
          <div className="fas fa-times-circle icon" />
          <div className="progress-bar">
            <div className="filler bad" />
          </div>
        </div>
      );
    }
    case "empty": {
      return (
        <div className="bar-wrapper empty">
          <div className="progress-bar">
            <div className="filler empty" />
          </div>
        </div>
      );
    }
  }
}

export function checkPasswordStrength(
  passLength: number,
  pass: string
): JSX.Element {
  const passwordLength = passLength;
  const password = pass;
  const specialCharacters = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
  let uppercase, lowercase, numbers, specChar;

  for (let _i = 0; _i < passwordLength; _i++) {
    if (password[_i] === password[_i].toLocaleUpperCase()) {
      uppercase = true;
    }
    if (password[_i] === password[_i].toLocaleLowerCase()) {
      lowercase = true;
    }
    if (!isNaN(parseInt(password[_i]))) {
      numbers = true;
    }
    if (password[_i].match(specialCharacters)) {
      specChar = true;
    }
  }

  if (passwordLength === 0) {
    return progressBar("empty");
  } else if (passwordLength > 8 && passwordLength < 12) {
    if (uppercase && lowercase && numbers) {
      return progressBar("weak");
    }
    return progressBar("very weak");
  } else if (passwordLength >= 12) {
    if (uppercase && lowercase && numbers && specChar) {
      return progressBar("very strong");
    }
    return progressBar("strong");
  } else {
    return progressBar("bad");
  }
}

export function hiddenText(
  type: string,
  inputDict: Inputs<string>,
  inputErrorDict: Inputs<string>
): JSX.Element {
  let inputDescription: JSX.Element;
  let errorMessage: JSX.Element;
  switch (type) {
    case "username": {
      inputDescription = (
        <div>
          This is the name people will know you by on this website. You can
          always change it later.
        </div>
      );
      errorMessage = (
        <div className="error-message">*This username is unavailable.</div>
      );
      break;
    }
    case "password": {
      inputDescription = (
        <div>
          Strong passwords include a mix of lower case letters, upper case
          letters, and special characters.
        </div>
      );
      errorMessage = (
        <div className="error-message">
          *Passwords must be at least 8 characters long.
        </div>
      );
      break;
    }
    case "email": {
      inputDescription = (
        <div>You'll need to verify that you own this email account.</div>
      );
      errorMessage = (
        <div className="error-message">*Please enter a valid email.</div>
      );
      break;
    }
    case "date": {
      errorMessage = (
        <div className="error-message">*Please enter a valid date.</div>
      );
      inputDescription = <div />;
    }
  }
  return (
    <div
      className={
        inputDict[type] === "focused"
          ? type === "email"
            ? "animation-target half"
            : "animation-target full"
          : "animation-target"
      }
    >
      <div
        className={
          inputDict[type] === "focused"
            ? "hidden-text nonhidden"
            : "hidden-text"
        }
      >
        {inputErrorDict[type] === "incorrect" ? errorMessage : inputDescription}
      </div>
    </div>
  );
}

export function isDateCorrect(inputErrorDict: Inputs<string>): boolean {
  if (
    inputErrorDict["month"] === "correct" &&
    inputErrorDict["day"] === "correct" &&
    inputErrorDict["year"] === "correct"
  ) {
    return true;
  } else {
    return false;
  }
}
