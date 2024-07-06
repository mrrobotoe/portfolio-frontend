import { useNavigate, useSearchParams } from "react-router-dom";

import { RegisterForm } from "@/app/features/auth/components/register-form";
import { Layout } from "@/components/layouts/auth-layout";

const RegisterRoute = () => {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  const navigate = useNavigate();

  return (
    <Layout title="Register your account">
      <RegisterForm
        onSuccess={() =>
          navigate(`${redirectTo ? `${redirectTo}` : "/app"}`, {
            replace: true,
          })
        }
      />
    </Layout>
  );
};

export { RegisterRoute };
