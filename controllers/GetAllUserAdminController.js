import Users from "../models/UserModel.js";

export const GetAllUserAdmin = async (req, res) => {
  try {
    // Get all users with role "user" and exclude the password
    const user = await Users.find({ role: "user" }).select("-password");
    res.send({ msg: "All Users", user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Something went wrong" });
  }
};
