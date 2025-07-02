import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

// Professional card with glass morphism and animations
const ProfessionalCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    glassEffect?: boolean
    hoverable?: boolean
    gradient?: boolean
  }
>(({ className, glassEffect = true, hoverable = true, gradient = false, children, ...props }, ref) => (
  <motion.div
    ref={ref}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    whileHover={hoverable ? { y: -4, scale: 1.01 } : undefined}
    className={cn(
      "relative overflow-hidden rounded-2xl border transition-all duration-300",
      glassEffect && "backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-white/20 dark:border-gray-800/20",
      !glassEffect && "bg-card",
      hoverable && "cursor-pointer hover:shadow-2xl hover:shadow-primary/10",
      gradient && "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
      className
    )}
    {...props}
  >
    <div className="relative z-10">{children}</div>
  </motion.div>
))
ProfessionalCard.displayName = "ProfessionalCard"

const CardShimmer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]",
      "bg-gradient-to-r from-transparent via-white/10 to-transparent",
      className
    )}
    {...props}
  />
))
CardShimmer.displayName = "CardShimmer"

const CardGlow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    color?: "primary" | "secondary" | "accent" | "success" | "warning" | "error"
  }
>(({ className, color = "primary", ...props }, ref) => {
  const colorClasses = {
    primary: "from-primary/20 to-primary/0",
    secondary: "from-secondary/20 to-secondary/0",
    accent: "from-accent/20 to-accent/0",
    success: "from-emerald-500/20 to-emerald-500/0",
    warning: "from-amber-500/20 to-amber-500/0",
    error: "from-red-500/20 to-red-500/0"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "absolute -inset-px rounded-2xl bg-gradient-to-r opacity-0 blur-xl transition-opacity group-hover:opacity-100",
        colorClasses[color],
        className
      )}
      {...props}
    />
  )
})
CardGlow.displayName = "CardGlow"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Animated stat card
const StatCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    title: string
    value: string | number
    change?: string
    trend?: "up" | "down"
    icon?: React.ReactNode
  }
>(({ className, title, value, change, trend, icon, ...props }, ref) => (
  <ProfessionalCard ref={ref} className={cn("group", className)} {...props}>
    <CardGlow />
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <CardDescription>{title}</CardDescription>
        {icon && (
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
      </div>
    </CardHeader>
    <CardContent>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="text-3xl font-bold"
      >
        {value}
      </motion.div>
      {change && (
        <div className={cn(
          "flex items-center gap-1 text-sm mt-1",
          trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
        )}>
          <motion.span
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {trend === "up" ? "↑" : "↓"} {change}
          </motion.span>
        </div>
      )}
    </CardContent>
    <CardShimmer />
  </ProfessionalCard>
))
StatCard.displayName = "StatCard"

// Agent feature card
const FeatureCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    title: string
    description: string
    icon?: React.ReactNode
    features?: string[]
    action?: React.ReactNode
  }
>(({ className, title, description, icon, features, action, ...props }, ref) => (
  <ProfessionalCard ref={ref} gradient className={cn("group", className)} {...props}>
    <CardHeader>
      <div className="flex items-start gap-4">
        {icon && (
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground shadow-lg"
          >
            {icon}
          </motion.div>
        )}
        <div className="flex-1">
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="mt-1">{description}</CardDescription>
        </div>
      </div>
    </CardHeader>
    {features && features.length > 0 && (
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              {feature}
            </motion.li>
          ))}
        </ul>
      </CardContent>
    )}
    {action && (
      <CardFooter>
        {action}
      </CardFooter>
    )}
  </ProfessionalCard>
))
FeatureCard.displayName = "FeatureCard"

export {
  ProfessionalCard,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardShimmer,
  CardGlow,
  StatCard,
  FeatureCard,
}