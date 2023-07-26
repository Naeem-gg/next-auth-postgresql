import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import  CredentialsProvider  from "next-auth/providers/credentials"
import prisma from "@/prisma/client"
import bcrypt from "bcryptjs"
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name:"credentials",
      credentials:{
              email:{label:"email",type:"email",placeholder:"example@example.com"},
              password:{label:"password",type:"password",placeholder:"******"},
              labName:{label:"labName",type:"text",placeholder:"enter your lab name"}
      },
      async authorize(credentials:any,req){
              
              const {email,password} = credentials 
              const user = await prisma.user.findUnique({where:{email}})
              if(!user){
                      return null
              }
              const isPasswordMatched = await bcrypt.compare(password, user.password )
              if(!isPasswordMatched){
                      return null
              }
              return user;

      }
    })
    // ...add more providers here
  ],
  pages:{
    signIn:"/login"
  }
}

export default NextAuth(authOptions)