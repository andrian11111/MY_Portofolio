"use client";

import { useEffect, useRef } from "react";

export default function LanyardCard() {
    const cardRef = useRef<HTMLDivElement>(null);
    const strapRef = useRef<SVGPathElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Physics state
    const xRef = useRef(0);
    const yRef = useRef(150); // natural hanging offset below anchor
    const vxRef = useRef(0);
    const vyRef = useRef(0);
    const rotXRef = useRef(0);
    const rotYRef = useRef(0); // Y rotation for spin/flip
    const rotZRef = useRef(0);
    const vRotXRef = useRef(0);
    const vRotYRef = useRef(0);
    const vRotZRef = useRef(0);

    const targetRotYRef = useRef(0); // Stores the target face (0 = front, 180 = back)

    const isDraggingRef = useRef(false);
    const pointerIdRef = useRef<number | null>(null);
    const lastPointerPosRef = useRef({ x: 0, y: 0 });
    const lastTimeRef = useRef(0);
    const dragDistanceRef = useRef(0);
    const rafRef = useRef<number | null>(null);

    const ropeLength = 180;
    const gravity = 0.5;
    const springTension = 0.04;
    const damping = 0.94; // air resistance for movement
    const rotSpringForce = 0.08; // spring tension for returning to target orientation
    const rotDamping = 0.85; // strong damping for rotation so it settles quickly

    useEffect(() => {
        const animate = (time: number) => {
            if (!lastTimeRef.current) lastTimeRef.current = time;
            const dt = Math.min((time - lastTimeRef.current) / 16, 3);
            lastTimeRef.current = time;

            let x = xRef.current;
            let y = yRef.current;
            let vx = vxRef.current;
            let vy = vyRef.current;
            let rotX = rotXRef.current;
            let rotY = rotYRef.current;
            let rotZ = rotZRef.current;
            let vRotX = vRotXRef.current;
            let vRotY = vRotYRef.current;
            let vRotZ = vRotZRef.current;

            if (isDraggingRef.current) {
                // Dragging physics
                vxRef.current = vxRef.current * 0.5;
                vyRef.current = vyRef.current * 0.5;

                // Tilt card based on dragging displacement and speed
                const targetRotX = Math.max(-20, Math.min(20, -vyRef.current * 2));
                // Tilt Y relative to target face (front or back) + drag offset
                const targetRotY = targetRotYRef.current + Math.max(-35, Math.min(35, xRef.current * 0.25));
                const targetRotZ = Math.max(-15, Math.min(15, -vxRef.current * 0.4));

                rotXRef.current += (targetRotX - rotXRef.current) * 0.15;
                rotYRef.current += (targetRotY - rotYRef.current) * 0.15;
                rotZRef.current += (targetRotZ - rotZRef.current) * 0.15;
            } else {
                // Natural hanging physics
                const targetX = 0;
                const targetY = 150;

                const forceX = (targetX - x) * springTension;
                const forceY = (targetY - y) * springTension + gravity;

                vx = (vx + forceX) * damping;
                vy = (vy + forceY) * damping;

                x += vx * dt;
                y += vy * dt;

                // Constraint: cannot go beyond ropeLength
                const dist = Math.sqrt(x * x + y * y);
                if (dist > ropeLength) {
                    x = (x / dist) * ropeLength;
                    y = (y / dist) * ropeLength;
                    
                    // Bounce
                    const nx = x / ropeLength;
                    const ny = y / ropeLength;
                    const dot = vx * nx + vy * ny;
                    if (dot > 0) {
                        vx = (vx - 2 * dot * nx) * 0.4;
                        vy = (vy - 2 * dot * ny) * 0.4;
                    }
                }

                xRef.current = x;
                yRef.current = y;
                vxRef.current = vx;
                vyRef.current = vy;

                // Rotate stability (spin returning quickly to stable front or back face)
                const targetRotY = targetRotYRef.current;

                const rotForceX = (0 - rotX) * rotSpringForce;
                const rotForceY = (targetRotY - rotY) * rotSpringForce;
                const rotForceZ = (0 - rotZ) * rotSpringForce;

                vRotX = (vRotX + rotForceX) * rotDamping;
                vRotY = (vRotY + rotForceY) * rotDamping;
                vRotZ = (vRotZ + rotForceZ) * rotDamping;

                rotXRef.current += vRotX * dt;
                rotYRef.current += vRotY * dt;
                rotZRef.current += vRotZ * dt;
            }

            // Apply style transformations
            if (cardRef.current) {
                cardRef.current.style.transform = `translate3d(${xRef.current}px, ${yRef.current}px, 0) rotateX(${rotXRef.current}deg) rotateY(${rotYRef.current}deg) rotateZ(${rotZRef.current}deg)`;
            }

            // Draw Strap
            if (strapRef.current) {
                const leftNeckX = 120;
                const leftNeckY = 10;
                const rightNeckX = 200;
                const rightNeckY = 10;
                
                // The hook point moves with the card.
                // In local container space, the card starts at center 160.
                const hookX = 160 + xRef.current;
                const hookY = yRef.current - 12; // hook matches the top of clip

                const distL = Math.sqrt((hookX - leftNeckX) * (hookX - leftNeckX) + hookY * hookY);
                const distR = Math.sqrt((rightNeckX - hookX) * (rightNeckX - hookX) + hookY * hookY);

                const slackL = Math.max(0, ropeLength - distL);
                const slackR = Math.max(0, ropeLength - distR);

                const cpL1_x = leftNeckX - slackL * 0.25;
                const cpL1_y = leftNeckY + distL * 0.45 + slackL * 0.35;
                const cpL2_x = hookX - 15 - slackL * 0.15;
                const cpL2_y = hookY - 15 - slackL * 0.15;

                const cpR1_x = hookX + 15 + slackR * 0.15;
                const cpR1_y = hookY - 15 - slackR * 0.15;
                const cpR2_x = rightNeckX + slackR * 0.25;
                const cpR2_y = rightNeckY + distR * 0.45 + slackR * 0.35;

                const dPath = `M ${leftNeckX} ${leftNeckY} C ${cpL1_x} ${cpL1_y} ${cpL2_x} ${cpL2_y} ${hookX} ${hookY} C ${cpR1_x} ${cpR1_y} ${cpR2_x} ${cpR2_y} ${rightNeckX} ${rightNeckY}`;
                strapRef.current.setAttribute("d", dPath);
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.button !== 0) return; // left click only
        isDraggingRef.current = true;
        pointerIdRef.current = e.pointerId;
        e.currentTarget.setPointerCapture(e.pointerId);

        lastPointerPosRef.current = { x: e.clientX, y: e.clientY };
        dragDistanceRef.current = 0;

        vxRef.current = 0;
        vyRef.current = 0;
        vRotXRef.current = 0;
        vRotYRef.current = 0;
        vRotZRef.current = 0;
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDraggingRef.current || pointerIdRef.current !== e.pointerId) return;

        const dx = e.clientX - lastPointerPosRef.current.x;
        const dy = e.clientY - lastPointerPosRef.current.y;

        lastPointerPosRef.current = { x: e.clientX, y: e.clientY };
        dragDistanceRef.current += Math.sqrt(dx * dx + dy * dy);

        xRef.current += dx;
        yRef.current += dy;

        // Constraint rope length
        const dist = Math.sqrt(xRef.current * xRef.current + yRef.current * yRef.current);
        if (dist > ropeLength) {
            xRef.current = (xRef.current / dist) * ropeLength;
            yRef.current = (yRef.current / dist) * ropeLength;
        }

        vxRef.current = dx;
        vyRef.current = dy;

        // Prevent rotational velocity accumulation during dragging
        vRotXRef.current = 0;
        vRotYRef.current = 0;
        vRotZRef.current = 0;
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        if (pointerIdRef.current === e.pointerId) {
            isDraggingRef.current = false;
            pointerIdRef.current = null;
            e.currentTarget.releasePointerCapture(e.pointerId);

            // Clean up velocities
            vRotXRef.current = 0;
            vRotYRef.current = 0;
            vRotZRef.current = 0;
        }
    };

    const handleCardClick = (e: React.MouseEvent) => {
        if (dragDistanceRef.current > 10) return;

        const target = e.target as HTMLElement;
        if (target.closest("a") || target.closest("button")) return;

        // Flip card 180 degrees
        targetRotYRef.current = targetRotYRef.current === 0 ? 180 : 0;
    };

    const handleLinkClick = (e: React.MouseEvent) => {
        if (dragDistanceRef.current > 10) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    return (
        <div 
            ref={containerRef}
            className="relative w-80 h-[560px] mx-auto select-none overflow-visible flex justify-center items-start"
        >
            {/* SVG Strap */}
            <svg 
                className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" 
                style={{ overflow: "visible" }}
            >
                <defs>
                    <linearGradient id="strapGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="50%" stopColor="#f97316" />
                        <stop offset="100%" stopColor="#ea580c" />
                    </linearGradient>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.4" />
                    </filter>
                </defs>
                <path
                    ref={strapRef}
                    d="M 120 10 C 120 70 155 120 160 150 C 165 120 200 70 200 10"
                    fill="none"
                    stroke="url(#strapGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    style={{ filter: "url(#shadow)" }}
                />
            </svg>

            {/* Neck Plate Anchor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 pointer-events-none">
                <div className="w-10 h-3 rounded-full bg-zinc-800 border border-zinc-700/80 shadow-md" />
            </div>

            {/* Card and Hook Container */}
            <div
                ref={cardRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onClick={handleCardClick}
                className="absolute top-0 w-72 h-[420px] cursor-grab active:cursor-grabbing z-10"
                style={{
                    transform: "translate3d(0px, 150px, 0px)",
                    transformStyle: "preserve-3d",
                    transformOrigin: "top center"
                }}
            >
                {/* Metallic Clip/Hook (Physically attached to the top of the card) */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 pointer-events-none">
                    {/* Ring loop */}
                    <div className="w-8 h-8 rounded-full border-[3px] border-zinc-500 bg-zinc-700/80 shadow-lg flex items-center justify-center">
                        <div className="w-3.5 h-3.5 rounded-full bg-zinc-950 border border-zinc-600/50" />
                    </div>
                    {/* Clip body connecting to card */}
                    <div className="w-5 h-6 bg-gradient-to-b from-zinc-500 to-zinc-600 border border-zinc-600 rounded-sm shadow-md -mt-1 flex items-center justify-center">
                        <div className="w-1.5 h-3 bg-zinc-700 rounded-full" />
                    </div>
                </div>

                {/* THE CARD FRONT FACE */}
                <div 
                    className="absolute inset-0 w-full h-full rounded-[24px] bg-zinc-900 border border-zinc-800 shadow-2xl p-4 flex flex-col justify-between select-none"
                    style={{ 
                        backfaceVisibility: "hidden",
                        transformStyle: "preserve-3d" 
                    }}
                >
                    {/* Slot Hole */}
                    <div className="w-12 h-2.5 mx-auto rounded-full bg-zinc-950 border border-zinc-800/80 shadow-inner mb-3" />
                    
                    {/* Inner Content Border */}
                    <div className="flex-1 flex flex-col items-center bg-zinc-950/40 border border-zinc-800/50 rounded-[16px] p-3">
                        <div className="w-full aspect-square relative rounded-xl overflow-hidden border border-zinc-700/30">
                            <img
                                src="/foto.png"
                                alt="Profile"
                                className="w-full h-full object-cover pointer-events-none"
                            />
                        </div>

                        <div className="text-center mt-3">
                            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                                Andrian Alfiani
                            </h2>
                            <p className="text-xs font-semibold text-amber-500 tracking-wider uppercase mt-0.5">
                                Full-Stack Developer
                            </p>
                        </div>
                    </div>

                    {/* Status Badge */}
                    <div className="mt-3 pt-2 border-t border-zinc-800/60 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
                            <span className="text-gray-300 text-sm">Available For Work</span>
                        </div>
                        <span className="text-amber-500/80 text-[9px] font-mono border border-amber-500/20 rounded px-1.5 py-0.5 bg-amber-500/5 hover:bg-amber-500/10 transition-colors">
                            TAP TO FLIP ↺
                        </span>
                    </div>
                </div>

                {/* THE CARD BACK FACE */}
                <div 
                    className="absolute inset-0 w-full h-full rounded-[24px] bg-zinc-900 border border-zinc-800 shadow-2xl p-4 flex flex-col justify-between select-none"
                    style={{ 
                        transform: "rotateY(180deg)",
                        backfaceVisibility: "hidden",
                        transformStyle: "preserve-3d" 
                    }}
                >
                    {/* Slot Hole */}
                    <div className="w-12 h-2.5 mx-auto rounded-full bg-zinc-950 border border-zinc-800/80 shadow-inner mb-3" />
                    
                    {/* Inner Content Border */}
                    <div className="flex-1 flex flex-col bg-zinc-950/40 border border-zinc-800/50 rounded-[16px] p-4 justify-center gap-3">
                        <div className="text-center mb-1">
                            <h3 className="text-sm font-mono text-zinc-400 uppercase tracking-widest font-bold">
                                Quick Access
                            </h3>
                        </div>

                        {/* IDN CV Link */}
                        <a
                            href="https://drive.google.com/file/d/1l9Mh2ZYAe4z4swk10vIX7PPpOr0FJF_a/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleLinkClick}
                            className="w-full py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-bold rounded-xl text-center text-xs flex items-center justify-center gap-2 border border-amber-500/30 shadow-md transition-all active:scale-95 cursor-pointer"
                        >
                            CV (IDN)
                        </a>

                        {/* ENG CV Link */}
                        <a
                            href="https://drive.google.com/file/d/1l9Mh2ZYAe4z4swk10vIX7PPpOr0FJF_a/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleLinkClick}
                            className="w-full py-2.5 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-bold rounded-xl text-center text-xs flex items-center justify-center gap-2 border border-rose-500/30 shadow-md transition-all active:scale-95 cursor-pointer"
                        >
                            CV (ENG)
                        </a>

                        {/* Let's Talk Whatsapp */}
                        <a
                            href="https://wa.me/6287710176594"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleLinkClick}
                            className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700/80 font-bold rounded-xl text-center text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
                        >
                            Let&apos;s Talk
                        </a>
                    </div>

                    {/* Barcode access badge */}
                    <div className="mt-3 pt-2 border-t border-zinc-800/60 flex flex-col items-center">
                        <div className="flex gap-0.5 items-end h-6 opacity-40">
                            <div className="w-[1.5px] h-full bg-zinc-400" />
                            <div className="w-[3px] h-full bg-zinc-400" />
                            <div className="w-[1px] h-full bg-zinc-400" />
                            <div className="w-[2px] h-full bg-zinc-400" />
                            <div className="w-[1px] h-full bg-zinc-400" />
                            <div className="w-[3px] h-full bg-zinc-400" />
                            <div className="w-[1.5px] h-full bg-zinc-400" />
                            <div className="w-[4px] h-full bg-zinc-400" />
                            <div className="w-[1px] h-full bg-zinc-400" />
                            <div className="w-[2.5px] h-full bg-zinc-400" />
                            <div className="w-[1.5px] h-full bg-zinc-400" />
                            <div className="w-[2px] h-full bg-zinc-400" />
                            <div className="w-[1px] h-full bg-zinc-400" />
                        </div>
                        <span className="text-[8px] font-mono text-zinc-500 mt-1 tracking-widest">
                            2026.06.23.AA
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}