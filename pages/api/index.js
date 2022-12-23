// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export const INFO = {
  name: "DOT SHOP",
  technology:['NEXT.JS','mongoDB',"Redux Toolkit","Redux Toolkit Query"],
  developers: [
    {
      name: "SAKIB SIDDIQI SUPTO",
      emails: ["sakibsiddiqi15@gmail.com", "sakibsiddiqisupto@gmail.com"],
      phone: ["01715073522", "01829815901"],
      address: ["Bangladesh"],
    },
  ],
};

export default function info(req, res) {
  res.status(200).json(INFO);
}
