import '/reset.css'
import '/index.css'
import stylesheet from '@kaliber/build/lib/stylesheet'
import javascript from '@kaliber/build/lib/javascript'
import polyfill from '@kaliber/build/lib/polyfill'
import rollbar from '@kaliber/build/lib/rollbar'
import config from '@kaliber/config'
import { pseudoRandom } from '@kaliber/math'
import App from '/App.universal'

import stickerA from '/images/stickers/cactus.svg'
import stickerC from '/images/stickers/car.svg'
import stickerD from '/images/stickers/strawberry.svg'

const sticker = [
  stickerA,
  stickerC,
  stickerD
][Math.floor(pseudoRandom(process.env.USER + 'd') * 3)]

Index.routes = {
  match(location) {
    const path = location.pathname
    if (path === '/') return { status: 200 }
    else return { status: 404, data: { notFound: true } }
  }
}

export default function Index({ location, data }) {
  return (
    <html lang='nl'>
      <head>
        <meta charSet='utf-8' />
        <title>@kaliber/build</title>
        <meta name='description' content='' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {stylesheet}
        {rollbar({ accessToken: config.rollbar.post_client_item })}
        {polyfill(['default', 'es2015', 'es2016', 'es2017', 'es2018', 'es2019'])}
        {javascript}
      </head>
      <body>
        {data && data.notFound
          ? 'Not found'
          : <App {...{ sticker }} seed={hash(process.env.USER)} />
        }
      </body>
    </html>
  )
}

function hash(s) {
  return s.split('').reduce(function(a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0)
}

