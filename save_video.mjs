import { createWriteStream } from "node:fs"
import { dirname, join, } from "node:path"
import { clearLine, cursorTo } from "node:readline"
import ytdl from 'ytdl-core'

let usageTime = 0;

const [, , link, name,] = process.argv
const __dirname = dirname(import.meta.url.slice(7))

if (link === undefined) {
  console.log('Add url on video')
  process.exit()
}

process.stdout.write('Downloading...')
const animationTimer = setInterval(
  () => {
    process.stdout.write('.')
    usageTime++
  }, 1000
)

const info = await ytdl.getInfo(link)
const {
  videoId,
  channelId,

} = info.player_response.videoDetails

const filteredFn = (format) => 
  format.mimeType?.startsWith('video/mp4')

const sorteredFn = (a, b) => b.height - a.height

const formats = info.formats
const downloadFormat = formats
  .filter(filteredFn)
  .sort(sorteredFn)
  .at(0)

const videoName = `${name ?? ''}_${channelId}_${videoId}.mp4`
const destination = join(
  __dirname,
  'content',
  '_video',
  videoName
)

const footerMessage = () => {
  clearInterval(animationTimer)
  clearLine(process.stdout, -1)
  cursorTo(process.stdout, 0)
  console.log(`Done in: ${usageTime} seconds`)
  console.log(`Name is ${videoName}`)
  console.log(destination)
}

ytdl
  .downloadFromInfo(info, {
    format: downloadFormat,
  })
  .pipe(createWriteStream(destination))
  .on("close", footerMessage)
