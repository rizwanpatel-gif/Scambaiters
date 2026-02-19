function Pinned() {
  return (
    <div className="flex gap-2 w-full">
      <div className="flex-1 h-[140px] rounded-2xl overflow-hidden border border-black/[0.06]">
        <img
          src="https://i.pinimg.com/736x/49/59/cd/4959cd3181c1a770d2b1d6a91474d19e.jpg"
          alt="Pinned 1"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex-1 h-[140px] rounded-2xl overflow-hidden border border-black/[0.06]">
        <img
          src="https://i.pinimg.com/736x/9d/be/22/9dbe226f8d37ddd559f5f99869325338.jpg"
          alt="Pinned 2"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  )
}

export default Pinned;
