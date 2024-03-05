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
                  <h5>Hello ${username}, here are the seller details</h5>
                  <br />
                  <h6>Seller Name: ${sellerName}</h6>
                  <h6>Seller Phone Number: ${sellerContact}</h6>
                  <h6>Seller Email: ${sellerEmail}</h6>
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
