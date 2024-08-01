import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

export const buyerDetailsEmail = async (
  email,
  username,
  sellerName,
  sellerContact,
  sellerEmail,
  productTitle
) => {
  const SES_CONFIG = {
    region: "eu-north-1",
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    },
  };

  const sesClient = new SESClient(SES_CONFIG);

  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
            <h3>Hello ${username}, here are the seller details for the product you were interested in - </h3>
            <h5>Seller Name: ${sellerName}</h5>
            <h5>Seller Phone Number: ${sellerContact}</h5>
            <h5>Seller Email: ${sellerEmail}</h5>
            <br/>
            <p>Thank you for using Spot Store</p>
          `,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: `SpotStore Seller Details for ${productTitle}`,
      },
    },
    Source: import.meta.env.VITE_EMAIL_USERNAME,
  };

  const command = new SendEmailCommand(params);
  const data = await sesClient.send(command);
  return data;
};
