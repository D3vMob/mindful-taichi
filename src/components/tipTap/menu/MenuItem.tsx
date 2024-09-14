import './MenuItem.css'

import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg'

export default function MenuItem ({
  icon, title, action, isActive = null,
}: {icon?: string, title?: string, action?: () => void, isActive?: (() => boolean) | null } ) {
  return <button
      className={`menu-item${isActive?.() ? ' is-active' : ''} w-8`}
      onClick={action}
      title={title}
    >
        {/* {title} */}
      <svg className="remix">
        <use xlinkHref={`${remixiconUrl}#ri-${icon}`}/>
      </svg>
    </button>
}