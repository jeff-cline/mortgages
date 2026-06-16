CREATE TABLE "admin_sessions" (
	"token" text PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "admin_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"must_change_password" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "admin_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"first_name" text,
	"last_name" text,
	"email" text,
	"phone" text,
	"purpose" text,
	"property_value" numeric,
	"down_payment" numeric,
	"loan_amount" numeric,
	"credit_band" text,
	"region" text,
	"zip" text,
	"source_page" text,
	"chosen_offer_id" text,
	"chosen_affiliate" text,
	"insurance_opt_in" boolean DEFAULT false,
	"status" text DEFAULT 'new',
	"raw_json" jsonb
);
--> statement-breakpoint
CREATE TABLE "offers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lead_id" uuid,
	"affiliate_id" text,
	"name" text,
	"rate" numeric,
	"apr" numeric,
	"monthly_payment" numeric,
	"fees" numeric,
	"points" numeric
);
--> statement-breakpoint
ALTER TABLE "admin_sessions" ADD CONSTRAINT "admin_sessions_user_id_admin_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."admin_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "offers" ADD CONSTRAINT "offers_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE no action ON UPDATE no action;