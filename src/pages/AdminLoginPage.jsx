import { Button, Form, Input, message } from "antd";
import { Helmet } from "react-helmet-async";
import { useAdminLoginMutation } from "../services/api/auth/authApiSlice";

import authImage from "../assets/auth-img.png";

function AdminLoginPage() {
  const [adminLogin, { isLoading: adminLoading }] = useAdminLoginMutation();

  const [form] = Form.useForm();

  const handleLogin = async (values) => {
    try {
      const { email, password } = values;
      const res = await adminLogin({ email, password }).unwrap();

      if (res?.payload?.role !== "admin") {
        message.error("You are not admin");
        return;
      }

      if (res?.payload?.token) {
        // Send data to admin domain via URL (or choose postMessage for better security)
        const adminUrl = `https://rv-park-backend-template.vercel.app/?token=${res?.payload?.token}&email=${res?.payload?.email}&role=${res?.payload?.role}&user=${res?.payload?.user}`;
        window.location.href = adminUrl;
      } else {
        message.error(
          res?.message || "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      message.error(
        error?.data?.message ||
          error?.message ||
          "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>Rv Park - Admin Login</title>
      </Helmet>
      <section className="h-screen flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 container">
          {/* Image Section */}
          <div className="hidden md:flex items-end justify-center">
            <img
              className="max-h-[880px] w-full h-full"
              src={authImage}
              alt="login"
            />
          </div>

          {/* Form Section */}
          <div className="flex flex-col justify-center">
            <div className="max-w-[500px] mx-auto">
              <div className="flex flex-col justify-center items-center w-full">
                {/* Logo */}
                {/* <Logoblack /> */}
                <h1 className="font-poppins font-bold text-3xl md:text-4xl lg:text-[56px] my-6 md:my-8 lg:my-10">
                  Welcome Back
                </h1>

                {/* Login Form */}
                <Form
                  form={form}
                  onFinish={handleLogin}
                  className="w-full space-y-7 p-4"
                  layout="vertical"
                >
                  <Form.Item
                    name="email"
                    label={<span className="text-lg">Email</span>}
                    rules={[
                      {
                        // required: true,
                        message: "Please enter your email",
                      },
                      {
                        type: "email",
                        message: "The input is not valid email",
                      },
                    ]}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input size="large" placeholder="Enter your email" />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label={<span className="text-lg">Password</span>}
                    rules={[
                      {
                        // required: true,
                        message: "Please enter your password",
                      },
                    ]}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Enter your password"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      loading={adminLoading}
                    >
                      {adminLoading ? "Logging in..." : "Login"}
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminLoginPage;
