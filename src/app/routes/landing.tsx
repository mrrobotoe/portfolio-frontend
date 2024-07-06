import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

import { Head } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { useUser } from "@/lib/auth";

const LandingRoute = () => {
  const navigate = useNavigate();
  const user = useUser();

  const handleStart = () => {
    if (user.data) {
      navigate("/app");
    } else {
      navigate("/signup");
    }
  };

  return (
    <>
      <Head description="Welcome to my portfolio site" />
      <div className="landing-route">
        <div className="landing-route__content">
          <h1 className="landing-route__header">My Portfolio</h1>
          <svg
            className="landing-route__icon"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="200px"
            width="200px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 2C13.5 2.44425 13.3069 2.84339 13 3.11805V5H18C19.6569 5 21 6.34315 21 8V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V8C3 6.34315 4.34315 5 6 5H11V3.11805C10.6931 2.84339 10.5 2.44425 10.5 2C10.5 1.17157 11.1716 0.5 12 0.5C12.8284 0.5 13.5 1.17157 13.5 2ZM6 7C5.44772 7 5 7.44772 5 8V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V8C19 7.44772 18.5523 7 18 7H13H11H6ZM2 10H0V16H2V10ZM22 10H24V16H22V10ZM9 14.5C9.82843 14.5 10.5 13.8284 10.5 13C10.5 12.1716 9.82843 11.5 9 11.5C8.17157 11.5 7.5 12.1716 7.5 13C7.5 13.8284 8.17157 14.5 9 14.5ZM15 14.5C15.8284 14.5 16.5 13.8284 16.5 13C16.5 12.1716 15.8284 11.5 15 11.5C14.1716 11.5 13.5 12.1716 13.5 13C13.5 13.8284 14.1716 14.5 15 14.5Z"></path>
          </svg>
          <p className="landing-route__description">
            Welcome to my portfolio site. This is a demo site to showcase my
            skills.
          </p>
          <div className="landing-route__footer">
            <Button
              onClick={handleStart}
              className="landing-route__get-started__link"
            >
              Get Started
            </Button>
            <Link to="https://github.com/mrrobotoe">
              <Button variant="outline">
                <GitHubLogoIcon />
                My Repo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export { LandingRoute };
