import { useNavigate, useSearchParams } from "react-router-dom";

import { LoginForm } from "@/app/features/auth/components/login-form";
import { Layout } from "@/components/layouts/auth-layout";

const LoginRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  return (
    <Layout title="Log into your account">
      <LoginForm
        onSuccess={() =>
          navigate(`${redirectTo ? `${redirectTo}` : "/app"}`, {
            replace: true,
          })
        }
      />
    </Layout>
  );
};

export { LoginRoute };
