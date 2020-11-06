import util from 'util';
import { Schema } from 'mongoose';

function BaseSchema() {
  Schema.apply(this, arguments);

  this.add({
    createdAt: { type: Date, default: Date.now() },
  });

  this.set('toJSON', {
    transform: function(doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  });
}

util.inherits(BaseSchema, Schema);

export default BaseSchema;
