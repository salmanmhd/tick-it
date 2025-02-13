import { useState } from "react";
import FormButton from "../components/FormButton";
import FormHeader from "../components/FormHeader";
import FormSuggestion from "../components/FormSuggestion";
import InputItem from "../components/InputItem";
import axios from "axios";
function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 py-20 text-slate-50">
      <div className="flex w-80 flex-col items-center justify-center rounded-md border border-slate-300 px-4 py-10 text-center text-slate-50">
        <FormHeader
          title={"Sign Up"}
          description={"Enter your infomation to create an account"}
        />
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex w-60 flex-col items-start"
        >
          <InputItem
            labelText={"First Name"}
            placeholderText={"John"}
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <InputItem
            labelText={"Last Name"}
            placeholderText={"Doe"}
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
          <InputItem
            labelText={"Email"}
            placeholderText={"johndoe@example.com"}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <InputItem
            labelText={"Password"}
            placeholderText={"*****"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <FormButton buttonText={"Sign up"} />
        </form>
        <FormSuggestion text={"Already have an account?"} referText={"Login"} />
      </div>
    </div>
  );
}

export default Signup;
