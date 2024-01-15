import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import tensorLogo from '../image/Tensor.png';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFinish = async () => {
    try {
      const res = await axios.post("/login", { email, password });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/hosted");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <div className="form-container" style={{ borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
      <Form layout="vertical" onFinish={onFinish} className="login-form">
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img src={tensorLogo} alt="Tensor Logo" style={{ width: "80px", height: "60px" }} />
          <h3 className="text-center">Login Form</h3>
        </div>

        <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter your email" }]}>
          <Input type="email" placeholder="Enter your Email id" onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password" }]}>
          <Input type="password" placeholder="Enter your Password" onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>

        <Link to="/register" className="m-4 a">
          Not a user? Register here
        </Link>

        <Button type="primary" htmlType="submit" className="btn btn-primary">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
