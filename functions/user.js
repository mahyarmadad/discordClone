export const loginUser = async (email, password) => {
  const user = await Parse.User.logIn(email, password);
  const session = user.getSessionToken();
  localStorage.setItem("session", session);
  localStorage.setItem("username", user.get("username"));
  localStorage.setItem("userid", user.id);
  localStorage.setItem("emailVerified", user.get("emailVerified"));
  localStorage.setItem("userCache", "");
  return user;
};

export const logOutUser = () => {
  localStorage.removeItem("session");
  localStorage.removeItem("username");
  localStorage.removeItem("userid");
  localStorage.removeItem("emailVerified");
  localStorage.setItem("userCache", "");
  return Parse.User.logOut();
};

export const registerUser = async (username, password, name, ref, recaptchaToken) => {
  let user = new Parse.User();
  user.set("username", username);
  user.set("password", password);
  user.set("email", username);
  user.set("name", name);
  user.set("referrer", ref);
  user.set("token", recaptchaToken);
  user.set("icon", {
    libIconName: "Person",
    text: "",
    bgColor: "#F1D0B3",
    type: "libraryIcon",
  });
  user = await user.signUp();
  const session = user.getSessionToken();
  localStorage.setItem("session", session);
  localStorage.setItem("username", user.get("username"));
  localStorage.setItem("userid", user.id);
  localStorage.setItem("emailVerified", user.get("emailVerified"));
  localStorage.setItem("userCache", "");
  return user;
};
