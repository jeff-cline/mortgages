import {
  pgTable,
  uuid,
  text,
  timestamp,
  numeric,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const leads = pgTable("leads", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  createdAt: timestamp("created_at").defaultNow(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
  phone: text("phone"),
  purpose: text("purpose"),
  propertyValue: numeric("property_value"),
  downPayment: numeric("down_payment"),
  loanAmount: numeric("loan_amount"),
  creditBand: text("credit_band"),
  region: text("region"),
  zip: text("zip"),
  sourcePage: text("source_page"),
  chosenOfferId: text("chosen_offer_id"),
  chosenAffiliate: text("chosen_affiliate"),
  insuranceOptIn: boolean("insurance_opt_in").default(false),
  status: text("status").default("new"),
  rawJson: jsonb("raw_json"),
});

export const offers = pgTable("offers", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  leadId: uuid("lead_id").references(() => leads.id),
  affiliateId: text("affiliate_id"),
  name: text("name"),
  rate: numeric("rate"),
  apr: numeric("apr"),
  monthlyPayment: numeric("monthly_payment"),
  fees: numeric("fees"),
  points: numeric("points"),
});

export const adminUsers = pgTable("admin_users", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  mustChangePassword: boolean("must_change_password").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const adminSessions = pgTable("admin_sessions", {
  token: text("token").primaryKey(),
  userId: uuid("user_id").references(() => adminUsers.id),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
export type Offer = typeof offers.$inferSelect;
export type NewOffer = typeof offers.$inferInsert;
export type AdminUser = typeof adminUsers.$inferSelect;
export type NewAdminUser = typeof adminUsers.$inferInsert;
export type AdminSession = typeof adminSessions.$inferSelect;
export type NewAdminSession = typeof adminSessions.$inferInsert;
