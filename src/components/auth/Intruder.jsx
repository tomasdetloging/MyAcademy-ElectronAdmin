// import { useRouter } from "next/router";
import React from "react";
import SignOut from "../../context/singout";
import Icons from "components/common/Icons";
import { Card, CardBody, Col, div, Row } from "reactstrap";
import { useUser } from "reactfire";
import Footer from "components/common/Footer";
import Logo from "components/common/Logo";

export default function Intruder() {
  const { data: user } = useUser();

  return (
    <div
      className="container d-flex"
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <Logo />
      <Card className="m-auto">
        <CardBody>
          <Row>
            <Col lg="6" className="d-none d-lg-flex px-5">
              <img
                className="mx-auto"
                src={require("assets/svgs/undraw_access_denied_6w73.svg")}
                alt=""
                style={{ maxWidth: "350px" }}
              />
            </Col>
            <Col xs="12" lg="6" className="p-4">
              <h1>Upss... You don't have permission to be here!!</h1>
              <p>It seems that you do not have permission to be here....</p>
              <p>
                It may be an error contact the administrator from the site to
                fix it.
              </p>

              <br />
              <p>Account declined:</p>

              <div className="card mt-3">
                <div left className="d-flex p-2 bg-dark">
                  <img
                    style={{
                      borderRadius: "50%",
                      width: "60px",
                      height: "60px",
                    }}
                    src={user.photoURL}
                    alt=""
                  />
                  <div className="p-2 text-white font-large">
                    <p>{user.displayName}</p>
                    <small>{user.email}</small>
                  </div>
                </div>
              </div>

              <div className="text-center d-flex mt-4">
                <SignOut.Consumer>
                  {(signOut) => (
                    <>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          signOut();
                        }}
                      >
                        <Icons icon="sign" className="mr-2" />
                        Sign in with another account
                      </button>
                    </>
                  )}
                </SignOut.Consumer>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Footer />
    </div>
  );
}
