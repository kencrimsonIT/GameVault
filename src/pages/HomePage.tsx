import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BadgeCheck,
  ChevronRight,
  Compass,
  Gauge,
  Ghost,
  Globe,
  Grid3x3,
  Headset,
  Heart,
  Monitor,
  Play,
  Rocket,
  Shield,
  ShoppingBag,
  Skull,
  Swords,
  Tag,
  Target,
  Timer,
  Trophy,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useGetGamesQuery } from "../features/games/api/gameApi.ts";
import type { Game } from "../features/games/types/game.types.ts";
import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
import { toggleWishlist } from "../features/wishlist/slices/wishlistSlice.ts";
import { formatCurrency } from "../utils/formatCurrency.ts";
import { formatDate } from "../utils/formatDate.ts";
import styles from "./HomePage.module.scss";

const categoryIcons: Record<string, LucideIcon> = {
  RPG: Swords,
  "Hành động": Zap,
  "Bắn súng": Target,
  FPS: Target,
  "Chiến thuật": Grid3x3,
  "Đua xe": Gauge,
  "Sinh tồn": Shield,
  "Phiêu lưu": Compass,
  "Thế giới mở": Globe,
  "Kinh dị": Ghost,
  Soulslike: Skull,
  "Không gian": Rocket,
  "Thể thao": Trophy,
};

function getDiscountPercent(game: Game) {
  return game.originalPrice > game.price
    ? Math.round((1 - game.price / game.originalPrice) * 100)
    : 0;
}

function getTimeLeft() {
  const now = new Date();
  const end = new Date(now);
  const daysUntilSunday = (7 - now.getDay()) % 7;
  end.setDate(now.getDate() + (daysUntilSunday === 0 ? 7 : daysUntilSunday));
  end.setHours(23, 59, 59, 999);

  const diff = Math.max(0, end.getTime() - now.getTime());
  return [
    Math.floor(diff / 3600000),
    Math.floor((diff % 3600000) / 60000),
    Math.floor((diff % 60000) / 1000),
  ]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
}

export default function HomePage() {
  const { data: games = [], isLoading, error } = useGetGamesQuery();
  const dispatch = useAppDispatch();
  const wishlistIds = useAppSelector((state) => state.wishlist.ids);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const intervalId = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  if (isLoading) {
    return (
      <main className={styles.page}>
        <p className={styles.status}>Đang tải cửa hàng...</p>
      </main>
    );
  }

  if (error || games.length === 0) {
    return (
      <main className={styles.page}>
        <p className={styles.status}>Không tải được dữ liệu. Hãy kiểm tra `pnpm api`.</p>
      </main>
    );
  }

  const hero = games.reduce((best, game) => (game.rating > best.rating ? game : best), games[0]);
  const heroHasDiscount = hero.originalPrice > hero.price;
  const heroWishlisted = wishlistIds.includes(hero.id);

  const trendingGames = [...games]
    .filter((game) => game.id !== hero.id)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  const dealGames = games
    .filter((game) => game.price < game.originalPrice)
    .sort((a, b) => getDiscountPercent(b) - getDiscountPercent(a))
    .slice(0, 3);

  const categoryCounts = new Map<string, number>();
  games.forEach((game) => {
    game.genres.forEach((genre) => {
      categoryCounts.set(genre, (categoryCounts.get(genre) ?? 0) + 1);
    });
  });
  const categories = [...categoryCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({ name, count, icon: categoryIcons[name] ?? Tag }));

  const newReleases = [...games]
    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
    .slice(0, 3);

  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroMedia}>
          <img className={styles.heroImage} src={hero.cover} alt={hero.title} />
          <div className={styles.heroBadges}>
            <span className={styles.badgeNew}>
              <span className={styles.badgeDot} aria-hidden="true" />
              Nổi bật tuần này
            </span>
            {heroHasDiscount && (
              <span className={styles.badgeDiscount}>-{getDiscountPercent(hero)}%</span>
            )}
          </div>
        </div>

        <div className={styles.heroPanel}>
          <div className={styles.heroTop}>
            <p className={styles.heroMeta}>
              <span>{hero.developer.toUpperCase()}</span>
              <span aria-hidden="true">•</span>
              <span>BẢN QUYỀN TOÀN CẦU</span>
            </p>
            <h1 id="hero-title" className={styles.heroTitle}>
              {hero.title.toUpperCase()}
            </h1>
            <p className={styles.heroDesc}>{hero.description}</p>

            <div className={styles.specBox}>
              <div>
                <span className={styles.specLabel}>Thể loại</span>
                <span className={styles.specValue}>{hero.genres.join(" / ")}</span>
              </div>
              <div>
                <span className={styles.specLabel}>Đánh giá</span>
                <span className={`${styles.specValue} ${styles.specAccent}`}>
                  {hero.rating}/5 ({hero.reviewCount.toLocaleString("vi-VN")} đánh giá)
                </span>
              </div>
            </div>
          </div>

          <div className={styles.heroFooter}>
            <div className={styles.priceRow}>
              <span className={styles.heroPrice}>{formatCurrency(hero.price)}</span>
              {heroHasDiscount && (
                <span className={styles.oldPrice}>{formatCurrency(hero.originalPrice)}</span>
              )}
            </div>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} to={`/games/${hero.id}`}>
                <Play size={18} aria-hidden="true" />
                Xem game
              </Link>
              <button
                type="button"
                className={
                  heroWishlisted
                    ? `${styles.secondaryButton} ${styles.wishlistActive}`
                    : styles.secondaryButton
                }
                aria-pressed={heroWishlisted}
                onClick={() => dispatch(toggleWishlist(hero.id))}
              >
                <Heart
                  size={18}
                  fill={heroWishlisted ? "currentColor" : "none"}
                  aria-hidden="true"
                />
                {heroWishlisted ? "Đã có trong Wishlist" : "Thêm vào Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED & TRENDING */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <h2 className={styles.sectionTitle}>Game nổi bật &amp; Thịnh hành</h2>
            <p className={styles.sectionDesc}>
              Những tựa game dẫn đầu lượng tải và cộng đồng yêu thích nhất tuần này
            </p>
          </div>
          <Link className={styles.sectionLink} to="/games">
            Xem tất cả <ChevronRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className={styles.cardGrid}>
          {trendingGames.map((game) => (
            <article key={game.id} className={styles.card}>
              <div className={styles.cardMedia}>
                <Link to={`/games/${game.id}`}>
                  <img
                    className={styles.cardImage}
                    src={game.cover}
                    alt={game.title}
                    loading="lazy"
                  />
                </Link>
                {getDiscountPercent(game) > 0 && (
                  <span className={styles.cardDiscount}>-{getDiscountPercent(game)}%</span>
                )}
              </div>
              <div className={styles.cardBody}>
                <span className={styles.cardTag}>{game.genres[0]}</span>
                <h3 className={styles.cardTitle}>
                  <Link to={`/games/${game.id}`}>{game.title}</Link>
                </h3>
                <p className={styles.cardDesc}>{game.description}</p>
              </div>
              <div className={styles.cardFoot}>
                <div>
                  {game.price < game.originalPrice && (
                    <span className={styles.oldPrice}>{formatCurrency(game.originalPrice)}</span>
                  )}
                  <span
                    className={
                      game.price < game.originalPrice
                        ? `${styles.cardPrice} ${styles.cardPriceSale}`
                        : styles.cardPrice
                    }
                  >
                    {formatCurrency(game.price)}
                  </span>
                </div>
                <Link
                  className={styles.iconButton}
                  to={`/games/${game.id}`}
                  aria-label={`Xem ${game.title}`}
                >
                  <ShoppingBag size={18} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SPECIAL DEALS */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div className={styles.dealHeading}>
            <span className={styles.dealMark} aria-hidden="true" />
            <h2 className={styles.sectionTitle}>Ưu đãi đặc biệt trong tuần</h2>
          </div>
          <div className={styles.timer}>
            <Timer size={16} className={styles.timerIcon} aria-hidden="true" />
            <span>Kết thúc sau:</span>
            <span className={styles.timerValue}>{timeLeft}</span>
          </div>
        </div>

        <div className={styles.dealGrid}>
          {dealGames.map((game) => (
            <article key={game.id} className={styles.dealCard}>
              <div className={styles.dealMedia}>
                <img
                  className={styles.dealImage}
                  src={game.cover}
                  alt={game.title}
                  loading="lazy"
                />
                <span className={styles.dealBadge}>-{getDiscountPercent(game)}%</span>
              </div>
              <div className={styles.dealBody}>
                <div>
                  <span className={styles.dealEyebrow}>{game.developer.toUpperCase()}</span>
                  <h3 className={styles.dealTitle}>{game.title}</h3>
                </div>
                <div className={styles.dealFoot}>
                  <div>
                    <span className={styles.oldPrice}>{formatCurrency(game.originalPrice)}</span>
                    <span className={styles.dealPrice}>{formatCurrency(game.price)}</span>
                  </div>
                  <Link className={styles.dealButton} to={`/games/${game.id}`}>
                    Chi tiết
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <h2 className={styles.sectionTitle}>Danh mục phổ biến</h2>
            <p className={styles.sectionDesc}>
              Duyệt nhanh theo các thể loại trò chơi được tuyển chọn
            </p>
          </div>
        </div>

        <div className={styles.categoryGrid}>
          {categories.map(({ name, count, icon: Icon }) => (
            <Link key={name} className={styles.categoryCard} to="/games">
              <Icon size={28} className={styles.categoryIcon} aria-hidden="true" />
              <span className={styles.categoryName}>{name}</span>
              <span className={styles.categoryCount}>{count} tựa game</span>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW RELEASES */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <h2 className={styles.sectionTitle}>Game mới phát hành</h2>
            <p className={styles.sectionDesc}>
              Cập nhật liên tục những bản phát hành kỹ thuật số mới nhất
            </p>
          </div>
          <Link className={styles.sectionLink} to="/games">
            Tất cả hệ máy <ChevronRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className={styles.releaseList}>
          {newReleases.map((game) => (
            <div key={game.id} className={styles.releaseRow}>
              <div className={styles.releaseInfo}>
                <div className={styles.releaseThumb}>
                  <img src={game.cover} alt={game.title} loading="lazy" />
                </div>
                <div>
                  <h3 className={styles.releaseTitle}>{game.title}</h3>
                  <p className={styles.releaseMeta}>
                    <span>{game.genres.join(" / ")}</span>
                    <span aria-hidden="true">•</span>
                    <span>{formatDate(game.releaseDate)}</span>
                  </p>
                </div>
              </div>
              <div className={styles.releaseActions}>
                <Monitor
                  size={16}
                  className={styles.platformIcon}
                  aria-label={game.platforms.join(", ")}
                />
                <span className={styles.releasePrice}>{formatCurrency(game.price)}</span>
                <Link className={styles.releaseButton} to={`/games/${game.id}`}>
                  <ShoppingBag size={16} aria-hidden="true" />
                  Mua ngay
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST BANNER */}
      <section className={styles.trustBanner}>
        <div className={styles.trustItem}>
          <BadgeCheck size={24} className={styles.trustIcon} aria-hidden="true" />
          <div>
            <h3 className={styles.trustTitle}>Khóa Kỹ Thuật Số Chính Hãng</h3>
            <p className={styles.trustDesc}>
              100% bản quyền phân phối trực tiếp từ nhà phát hành toàn cầu.
            </p>
          </div>
        </div>
        <div className={styles.trustItem}>
          <Zap size={24} className={styles.trustIcon} aria-hidden="true" />
          <div>
            <h3 className={styles.trustTitle}>Giao Khóa Tức Thì</h3>
            <p className={styles.trustDesc}>
              Kích hoạt vào tài khoản trong vòng 3 giây ngay sau khi thanh toán.
            </p>
          </div>
        </div>
        <div className={styles.trustItem}>
          <Headset size={24} className={styles.trustIcon} aria-hidden="true" />
          <div>
            <h3 className={styles.trustTitle}>Hỗ Trợ Kỹ Thuật 24/7</h3>
            <p className={styles.trustDesc}>
              Đội ngũ chuyên viên sẵn sàng giải đáp và xử lý kích hoạt game liên tục.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
