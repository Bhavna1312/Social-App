import axios from "axios";

export default function Register() {
  const register = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/auth/register",
        {
          username: "bhavna1234",
          email: "bhavna1234@test.com",
          password: "123456",
        },
      );

      alert("Registered successfully");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Register failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <button onClick={register}>Register</button>
    </div>
  );
}
