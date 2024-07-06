import { Button } from "../ui/button";

const MainErrorFallback = () => {
  return (
    <div className="main-error-fallback">
      <h1 className="main-error-fallback__header">
        Oops! Something went wrong.
      </h1>
      <p className="main-error-fallback__description">
        An unexpected error has occurred. Please try refreshing the page.
      </p>
      <Button
        className="main-error-fallback__refresh-button"
        onClick={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </Button>
    </div>
  );
};

export { MainErrorFallback };
