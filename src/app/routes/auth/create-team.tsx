import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { CreateTeamForm } from "@/app/features/teams/components/create-team-form";
import { Layout } from "@/components/layouts/auth-layout";

const CreateTeamRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  return (
    <Layout title="Create your team">
      <CreateTeamForm
        onSuccess={() => {
          navigate(`${redirectTo ? `${redirectTo}` : "/app"}`, {
            replace: true,
          });
        }}
      />
    </Layout>
  );
};

export { CreateTeamRoute };
