import pit from '/images/avocados/pit.svg'
import styles from './App.css'

import { useSpring, animated } from '@react-spring/web'
import { useGesture, useDrag } from '@use-gesture/react'

export default function App() {
  const [spring, api] = useSpring(() => ({ x: 0, y: 0 }))

  const bind = useDrag(handleDrag, {
    from: () => [spring.x.get(), spring.y.get()],
    bounds: { left: -200, right: 200, top: -200, bottom: 200 },
    rubberband: true
  })

  const [isActive, setIsActive] = React.useState(false)

  return (
    <div className={styles.component}>
      <div className={cx(styles.avocado, isActive && styles.scared)}>
        <animated.img className={styles.pit} src={pit} alt='' draggable={false} style={spring} {...bind()} />
      </div>
    </div>
  )

  function handleDrag({ offset: [x, y], down }) {
    api.start({ x, y, immediate: true })

    setIsActive(down)

    if (!down) {
      api.start({ x: 0, y: 0 })
    }
  }

}
