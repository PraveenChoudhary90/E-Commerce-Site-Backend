import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import AdminRoute from "./routes/AdminRoute.js";
import UserRoute from "./routes/UserRoute.js";
import AddCategoryRoute from "./routes/AddcategoryRoute.js";
import AddAttributeRoute from "./routes/AddAttributeRoute.js";
import AddProdutRoute from "./routes/AddProductRoute.js";
import OrdersAdminRoute from "./routes/OrderAdminRoute.js";
import GetAllUserAdminRoute from "./routes/GetAllUserAdminRoute.js";
import AddBannerRoute from "./routes/AddBannnerRoute.js";
import AddOfferRoute from "./routes/AddOfferRoute.js";
import GetProductUserRoute from "./routes/GetProductsRoute.js";
import UserOrderRoute from "./routes/GetOrderHistoryUserRoute.js";
import AdminChangePasswordRoute from "./routes/AdminChangePasswordroute.js";
import GetBannerUser from "./routes/GetBannerRoute.js"; 
import GetUserProfileRoute from "./routes/GetProfileUserRoute.js";
import UserPasswordchangeroute from "./routes/UserChangePasswordroute.js";


connectDB();
const app = express();

const corsOptions = {
  origin: (origin, callback) => {
    callback(null, origin); // dynamically origin allow kare
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json({limit:"40mb"}));
app.use(express.urlencoded({extended:true}));




app.use("/api/admin",AdminRoute,OrdersAdminRoute,GetAllUserAdminRoute,AddOfferRoute, AdminChangePasswordRoute);
app.use("/api/user", UserRoute,GetProductUserRoute,UserOrderRoute,GetBannerUser,GetUserProfileRoute, UserPasswordchangeroute);
app.use("/api/products", AddCategoryRoute,AddAttributeRoute,AddProdutRoute,AddBannerRoute);

const port = process.env.PORT || 8000


app.listen(port, ()=>{
    console.log(`SERVER IS RUNNING ON ${port} PORT`)
})