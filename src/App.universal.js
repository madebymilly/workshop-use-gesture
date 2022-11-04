import { useSpring, animated } from '@react-spring/web'
import { useGesture, useDrag } from '@use-gesture/react'
import { pseudoRandom } from '@kaliber/math'
import styles from './App.css'

export default function App({ sticker, seed }) {
  const x = pseudoRandom(`${seed}x`)
  const y = pseudoRandom(`${seed}y`)

  const [spring, api] = useSpring(() => ({ x: 0, y: 0 }))

  const bind = useDrag(handleDrag)

  const [isActive, setIsActive] = React.useState(false)

  return (
    <div className={styles.component} style={{ '--x': x, '--y': y }}>
      <animated.img
        {...bind()}
        className={cx(styles.sticker, isActive && styles.isActive)}
        src={sticker}
        alt=''
        style={spring}
        draggable={false}
      />
    </div>
  )

  function handleDrag({ offset: [x, y], down }) {
    api.start({ x, y, immediate: true })
    console.log(down)
    if (down) {
      setIsActive(true)
    }
  }
}
