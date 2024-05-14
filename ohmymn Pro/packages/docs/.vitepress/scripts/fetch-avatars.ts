import { fileURLToPath } from "url"
import { join, resolve } from "pathe"
import fs from "fs-extra"
import { $fetch } from "ohmyfetch"

const docsDir = resolve(fileURLToPath(import.meta.url), "../../..")
const pathContributors = resolve(docsDir, "../../contributors.json")
const dirAvatars = resolve(docsDir, "public/user-avatars/")

let contributors: string[] = []

async function download(url: string, fileName: string) {
  if (fs.existsSync(fileName)) return
  // eslint-disable-next-line no-console
  console.log("downloading", fileName)
  try {
    const image = await $fetch(url, { responseType: "arrayBuffer" })
    await fs.writeFile(fileName, Buffer.from(image))
  } catch {}
}

async function fetchAvatars() {
  await fs.ensureDir(dirAvatars)
  contributors = JSON.parse(
    await fs.readFile(pathContributors, { encoding: "utf-8" })
  )

  await Promise.all(
    contributors.map(name =>
      download(
        `https://github.com/${name}.png?size=100`,
        join(dirAvatars, `${name}.png`)
      )
    )
  )
}

fetchAvatars()
