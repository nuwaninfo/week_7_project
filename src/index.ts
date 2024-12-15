import { Request, Response, Router } from "express"
import bcrypt from "bcrypt"

const router: Router = Router()

router.get("/hello", (req: Request, res: Response) => {
  res.json({ msg: "Hello world!" })
})

router.get("/echo/:id", (req: Request, res: Response) => {
  res.json(req.params)
})

type TUser = {
  email: string
  password: string
}
let users: Array<TUser> = []

router.post("/api/user/register", async (req: Request, res: Response) => {
  const email: string = req.body.email
  const password: string = req.body.password

  try {
    const isUserExists: boolean | null = users.some(
      (user) => user.email === email
    )

    console.log(isUserExists)
    if (isUserExists) {
      return res.status(403).json({ username: "User already exists" })
    }

    const salt: string = bcrypt.genSaltSync(10)
    const hash: string = bcrypt.hashSync(password, salt)

    const newUser: TUser = { email: email, password: hash }

    users.push(newUser)
    console.log(users)

    return res.status(200).json(newUser)
  } catch (error: any) {
    console.error(`Error during registration: ${error}`)
    return res.status(500).json({ error: "Internal Server Error" })
  }
})

router.get("/api/user/list", (req: Request, res: Response) => {
  res.json(users)
})

router.post("/sum", (req: Request, res: Response) => {
  let numbersArr: number[] = req.body.numbers
  let sum: number = 0
  numbersArr.forEach((element) => (sum = sum + element))
  res.json({ sum: sum })
})

export default router
