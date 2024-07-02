import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "@/store/token";

const Owner = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);
  //   const [token, setToken] = useState('');

  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);

  const sendCode = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_SEND_CODE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    if (res.ok) {
      alert("Verification code sent!");
      const data = await res.json();
      dispatch(setToken(data.token));
      setStep(2);
    } else {
      alert("Error sending code");
    }
  };

  const verifyCode = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_VERIFY_CODE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, code }),
    });

    if (res.ok) {
      alert("Login successful");
      router.push(`/owner/projects/${token}`);
      localStorage.setItem("token", token);
    } else {
      alert("Invalid or expired code");
    }
  };

  return (
    <div>
      {step === 1 ? (
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-black"
          />
          <button onClick={sendCode}>Send Code</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Enter the code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="text-black"
          />
          <button onClick={verifyCode}>Verify Code</button>
        </div>
      )}
    </div>
  );
};

export default Owner;
