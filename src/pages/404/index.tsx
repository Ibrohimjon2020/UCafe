import HttpError from "@/components/http-error";
import Container from "@/layout/container";
import { StoreType } from "@/store";
import { useSelector } from "react-redux";

const NotFound = () => {
  const isAuthentificated = useSelector((store: StoreType) => store.auth.token);
  if (isAuthentificated) {
    return (
      <Container>
        <HttpError statusCode={404} />
      </Container>
    );
  }
  return <HttpError statusCode={404} />;
};

export default NotFound;
