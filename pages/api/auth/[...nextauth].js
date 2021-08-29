import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import axios from 'axios'

export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        Providers.Credentials({
            async authorize(credentials) {

                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                // let user
                // let error
                const user = await axios.post("https://inspiry.co.nz/wp-json/jwt-auth/v1/token",
                    {
                        username: credentials.email,
                        password: credentials.password
                    }).then(response => {
                        return response

                    }).catch(err => {
                        return err.response.status
                    })

                console.log(user)
                if (user === 403) {
                    throw new Error("Email or password is incorrect")
                }

                return {
                    email: user.data.token,
                    name: user.data.user_nicename
                }
            }
        })
    ]
})