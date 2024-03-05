import axios from "axios";

export const buyerDetailsEmail = async (
  email,
  username,
  sellerName,
  sellerContact,
  sellerEmail,
  productTitle
) => {
  const postData = {
    Recipients: [
      {
        Email: email,
      },
    ],
    Content: {
      From: `Vitspot <${import.meta.env.VITE_EMAIL_USERNAME}>`,
      Body: [
        {
          ContentType: "HTML",
          Content: `
                  <h3>Hello ${username}, here are the seller details</h3>
                  <h4>Seller Name: ${sellerName}</h4>
                  <h4>Seller Phone Number: ${sellerContact}</h4>
                  <h4>Seller Email: ${sellerEmail}</h4>
                  <br/>
                  <p>Thank you for using Spot Store</p>
              `,
        },
      ],
      Subject: `Seller Details for ${productTitle}`,
    },
  };

  const mailRequest = await axios.post(
    "https://api.elasticemail.com/v4/emails",
    postData,
    {
      headers: {
        "Content-Type": "application/json",
        "X-ElasticEmail-ApiKey": `${
          import.meta.env.VITE_ELASTIC_EMAIL_API_KEY
        }`,
      },
    }
  );
  return mailRequest;
};
