import { db } from "./db";

export const getUserbyEmail = async (email: string) => {
  try {
    return await db.user.findUnique({
      where: { email },
    });
  } catch (error) {
    return null;
  }
};
export const getUserById =async(id:string)=>{
  try {
    return await db.user.findUnique({
      where: { id },
    });
  } catch (error) {
    return null;
  }
}