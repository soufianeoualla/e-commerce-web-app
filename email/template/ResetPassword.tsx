import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Preview,
    Section,
    Text,
  } from "@react-email/components";
  import * as React from "react";
  
  interface ResetPasswordProps {
    name?: string;
    resetPasswordLink?: string;
  }
  
  
  
  export const ResetPassword = ({
    name,
    resetPasswordLink,
  }: ResetPasswordProps) => {
    return (
      <Html>
        <Head />
        <Preview>Ecommerce reset your password</Preview>
        <Body style={main}>
          <Container style={container}>
            <Section>
              <Text style={text}>Hi {name},</Text>
              <Text style={text}>
                Someone recently requested a password change for your account. If this was you, you can set a new password here:
              </Text>
              <Button style={button} href={resetPasswordLink}>
                Reset password
              </Button>
              <Text style={text}>
                If you don&apos;t want to change your password or didn&apos;t
                request this, just ignore and delete this message.
              </Text>
              <Text style={text}>
                To keep your account secure, please don&apos;t forward this email
                to anyone.
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  };
  
  ResetPassword.PreviewProps = {
    name: "Alan",
    resetPasswordLink: "https://dropbox.com",
  } as ResetPasswordProps;
  
  export default ResetPassword;
  
  const main = {
    backgroundColor: "#f6f9fc",
    padding: "10px 0",
  };
  
  const container = {
    backgroundColor: "#ffffff",
    border: "1px solid #f0f0f0",
    padding: "45px",
  };
  
  const text = {
    fontSize: "16px",
    fontFamily:
      "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
    fontWeight: "300",
    color: "#404040",
    lineHeight: "26px",
  };
  
  const button = {
    backgroundColor: "#0E1422",
    borderRadius: "8px",
    color: "#fff",
    fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
    fontSize: "15px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    width: "180px",
    padding: "14px 7px",
  };
  
  