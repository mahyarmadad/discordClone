export async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  if (response.status === 200) return response.json();
  else throw new Error(await response.text());
}

export function setUser(user) {
  localStorage.setItem("username", user.username);
  localStorage.setItem("token", user.token);
  localStorage.setItem("email", user.email);
}
export const logOutUser = () => {
  localStorage.removeItem("username");
  localStorage.removeItem("token");
  localStorage.removeItem("email");
};
