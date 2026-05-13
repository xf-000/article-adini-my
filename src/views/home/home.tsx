import { FC, useEffect, useRef } from 'react'
import styles from '@/views/home/css/home.module.less'

const Eye = () => {
    const eyeRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const updatePupil = (e: MouseEvent) => {
            if (!eyeRef.current) return
            const eye = eyeRef.current
            const rect = eye.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2
            const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX)
            const maxDist = rect.width / 6
            const dist = Math.min(maxDist, Math.hypot(e.clientX - centerX, e.clientY - centerY) / 20)
            const pupil = eye.querySelector(`.${styles.pupil}`) as HTMLElement
            if (pupil) {
                pupil.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`
            }
        }
        window.addEventListener('mousemove', updatePupil)
        return () => window.removeEventListener('mousemove', updatePupil)
    }, [])

    return (
        <div ref={eyeRef} className={styles.eye}>
            <div className={styles.eyeball}>
                <div className={styles.pupil} />
            </div>
        </div>
    )
}

const Figure = ({ delay }: { delay: number }) => (
    <div className={styles.figure} style={{ animationDelay: `${delay}ms` }}>
        <div className={styles.head}>
            <Eye />
            <Eye />
        </div>
        <div className={styles.body} />
        <div className={styles.legs}>
            <div className={styles.leg} />
            <div className={styles.leg} />
        </div>
    </div>
)

const DecorativeDivider = () => (
    <div className={styles.divider}>
        <span className={styles.dividerLine} />
        <span className={styles.dividerIcon}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
        </span>
        <span className={styles.dividerLine} />
    </div>
)

const InfoCard = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
    <div className={styles.infoCard}>
        <span className={styles.cardIcon}>{icon}</span>
        <span className={styles.cardLabel}>{label}</span>
        <span className={styles.cardValue}>{value}</span>
    </div>
)

const Home: FC = () => (
    <div className={styles.containerHome}>
        <h1 className={styles.title}>欢迎来到文章管理系统</h1>

        <div className={styles.decorations}>
            <DecorativeDivider />

            <div className={styles.infoCards}>
                <InfoCard icon="📚" label="文章" value="100+" />
                <InfoCard icon="👥" label="用户" value="500+" />
                <InfoCard icon="⭐" label="收藏" value="200+" />
            </div>

            <div className={styles.floatingDots}>
                <span className={styles.dot} style={{ animationDelay: '0s' }} />
                <span className={styles.dot} style={{ animationDelay: '0.5s' }} />
                <span className={styles.dot} style={{ animationDelay: '1s' }} />
            </div>
        </div>

        <div className={styles.figures}>
            <Figure delay={0} />
            <Figure delay={100} />
            <Figure delay={200} />
            <Figure delay={300} />
            <Figure delay={400} />
            <Figure delay={500} />
            <Figure delay={600} />
        </div>
    </div>
)

export default Home