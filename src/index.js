import dotenv from "dotenv";
import express from "express";
import router from "./Routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import ThirdPartyEmailPassword from "supertokens-node/recipe/thirdpartyemailpassword";
import { middleware } from "supertokens-node/framework/express";
import UserRoles from "supertokens-node/recipe/userroles";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { SessionRequest } from "supertokens-node/framework/express";

let { Google } = ThirdPartyEmailPassword;
dotenv.config();

console.log(process.env);
supertokens.init({
  framework: "express",
  supertokens: {
    connectionURI: process.env.connectionURI,
    apiKey: process.env.SP_API_KEY,
  },
  appInfo: {
    appName: "fbs",
    apiDomain: process.env.BACK_URL,
    websiteDomain: process.env.FRONT_URL,
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    ThirdPartyEmailPassword.init({
      providers: [
        Google({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
      ],
    }),
    Session.init({
      override: {
        functions: (originalImplementation) => {
          return {
            ...originalImplementation,
            createNewSession: async function (input) {
              let userId = input.userId;

              let roles = await UserRoles.getRolesForUser(userId);

              input.accessTokenPayload = {
                ...input.accessTokenPayload,
                roles,
              };

              return originalImplementation.createNewSession(input);
            },
          };
        },
      },
    }),
    UserRoles.init(),
  ],
});

const { PORT } = process.env;
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(
  cors({
    origin: true,
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
);
app.use(middleware());
app.use("/", router);
app.use(cookieParser());
app.use("/src/images", express.static("src/images"));

app.listen(PORT, () => {
  console.log("Yey, your server is running on port " + PORT);
});

export default app;
