import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Tenant extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  logo?: string;

  @Prop()
  address?: string;

  @Prop()
  phone?: string;

  @Prop()
  email?: string;

  @Prop()
  taxId?: string;

  @Prop({ enum: ['COP', 'USD'], default: 'COP' })
  currency: string;

  @Prop({ enum: ['UTC'], default: 'UTC' })
  timezone: string;

  @Prop()
  websiteUrl?: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);