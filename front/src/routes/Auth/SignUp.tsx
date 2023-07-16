// import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import { GUserInputsRefs } from "../../Globals/Variables";

export default function SignUp() {
  let navigate = useNavigate();

  async function handleClick(event: any) {
    event.preventDefault();
    navigate("/auth/signin");
  }

  return (
    <div>
      <h3 className="Auth-form-title">Sign up.</h3>
      <div className="text-secondary">
        <a href="/signin" onClick={handleClick}>
          Sign up
        </a>
      </div>
    </div>
  );
}
