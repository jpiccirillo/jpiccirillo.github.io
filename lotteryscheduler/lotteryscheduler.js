var chart = c3.generate({
    padding: {
        top: 30,
        right: 30,
        bottom: 20,
        left: 80,
    },
    size: {
        height: 300,
        width: 1000
    },
    data: {
        columns: [
            ['Process A (30 Tickets)', 0.0000, 0.0000, 0.0000, 0.0000, 0.2000, 0.1667, 0.2857, 0.2500, 0.3333, 0.3000, 0.2727, 0.3333, 0.3077, 0.2857, 0.2667, 0.3125, 0.2941, 0.2778, 0.3158, 0.3000, 0.3333, 0.3636, 0.3913, 0.3750, 0.4000, 0.3846, 0.4074, 0.3929, 0.4138, 0.4333, 0.4516, 0.4375, 0.4242, 0.4412, 0.4286, 0.4167, 0.4324, 0.4474, 0.4615, 0.4500, 0.4634, 0.4524, 0.4651, 0.4545, 0.4667, 0.4565, 0.4468, 0.4375, 0.4286, 0.4400, 0.4510, 0.4423, 0.4528, 0.4444, 0.4545, 0.4464, 0.4386, 0.4310, 0.4237, 0.4167, 0.4098, 0.4032, 0.4127, 0.4063, 0.4000, 0.3939, 0.3881, 0.3824, 0.3913, 0.4000, 0.4085, 0.4028, 0.3973, 0.3919, 0.4000, 0.3947, 0.4026, 0.4103, 0.4177, 0.4125, 0.4074, 0.4024, 0.4096, 0.4167, 0.4235, 0.4186, 0.4253, 0.4205, 0.4157, 0.4111, 0.4066, 0.4022, 0.3978, 0.3936, 0.4000, 0.3958, 0.4021, 0.3980, 0.4040, 0.4100, 0.4158, 0.4118, 0.4175, 0.4135, 0.4095, 0.4057, 0.4019, 0.3981, 0.4037, 0.4000, 0.4054, 0.4018, 0.4071, 0.4123, 0.4174, 0.4224, 0.4274, 0.4237, 0.4286, 0.4250, 0.4215, 0.4262, 0.4309, 0.4274, 0.4240, 0.4286, 0.4331, 0.4297, 0.4341, 0.4308, 0.4351, 0.4318, 0.4361, 0.4403, 0.4444, 0.4485, 0.4453, 0.4493, 0.4460, 0.4429, 0.4468, 0.4507, 0.4545, 0.4514, 0.4552, 0.4521, 0.4558, 0.4595, 0.4564, 0.4533, 0.4570, 0.4605, 0.4641, 0.4610, 0.4581, 0.4551, 0.4522, 0.4494, 0.4465, 0.4438, 0.4410, 0.4383, 0.4417, 0.4390, 0.4364, 0.4337, 0.4371, 0.4405, 0.4379, 0.4353, 0.4386, 0.4360, 0.4393, 0.4368, 0.4400, 0.4375, 0.4407, 0.4438, 0.4469, 0.4500, 0.4530, 0.4560, 0.4590, 0.4620, 0.4595, 0.4570, 0.4599, 0.4574, 0.4603, 0.4579, 0.4555, 0.4531, 0.4560, 0.4588, 0.4615, 0.4643, 0.4619, 0.4596, 0.4623, 0.4600, 0.4577, 0.4604, 0.4631, 0.4657, 0.4683, 0.4660, 0.4686, 0.4712, 0.4737, 0.4714, 0.4692, 0.4670, 0.4695, 0.4673, 0.4651, 0.4676, 0.4654, 0.4633, 0.4658, 0.4636, 0.4661, 0.4640, 0.4664, 0.4688, 0.4711, 0.4690, 0.4714, 0.4737, 0.4760, 0.4739, 0.4762, 0.4784, 0.4764, 0.4786, 0.4766, 0.4746, 0.4768, 0.4790, 0.4812, 0.4833, 0.4855, 0.4835, 0.4815, 0.4836, 0.4816, 0.4797, 0.4818, 0.4839, 0.4819, 0.4800, 0.4821, 0.4802, 0.4822, 0.4843, 0.4863, 0.4883, 0.4864, 0.4845, 0.4826, 0.4808, 0.4789, 0.4809, 0.4829, 0.4848, 0.4830, 0.4850, 0.4869, 0.4851, 0.4870, 0.4852, 0.4871, 0.4890, 0.4908, 0.4927, 0.4945, 0.4964, 0.4982, 0.4964, 0.4982, 0.4964, 0.4982, 0.5000, 0.5018, 0.5000, 0.5018, 0.5000, 0.5017, 0.5000, 0.4983, 0.4966, 0.4983, 0.4966, 0.4949, 0.4932, 0.4915, 0.4899, 0.4882, 0.4866, 0.4883, 0.4900, 0.4917, 0.4934, 0.4950, 0.4934, 0.4951, 0.4935, 0.4919, 0.4903, 0.4887, 0.4871, 0.4887, 0.4904, 0.4920, 0.4904, 0.4921, 0.4905, 0.4921, 0.4937, 0.4922, 0.4906, 0.4891, 0.4907, 0.4892, 0.4877, 0.4892, 0.4908, 0.4924, 0.4909, 0.4894, 0.4879, 0.4894, 0.4910, 0.4925, 0.4910, 0.4925, 0.4911, 0.4896, 0.4882, 0.4897, 0.4912, 0.4927, 0.4942, 0.4956, 0.4942, 0.4957, 0.4942, 0.4928, 0.4943, 0.4928, 0.4914, 0.4929, 0.4915, 0.4901, 0.4887, 0.4901, 0.4916, 0.4902, 0.4916, 0.4903, 0.4917, 0.4931, 0.4945, 0.4959, 0.4945, 0.4932, 0.4945, 0.4959, 0.4946, 0.4932, 0.4919, 0.4933, 0.4919, 0.4933, 0.4920, 0.4933, 0.4947, 0.4960, 0.4947, 0.4934, 0.4947, 0.4961, 0.4974, 0.4961, 0.4948, 0.4935, 0.4948, 0.4961, 0.4948, 0.4961, 0.4949, 0.4962, 0.4974, 0.4987, 0.4975, 0.4962, 0.4975, 0.4987, 0.4975, 0.4962, 0.4950, 0.4938, 0.4950, 0.4963, 0.4950, 0.4963, 0.4951, 0.4939, 0.4926, 0.4939, 0.4927, 0.4939, 0.4927, 0.4939, 0.4952, 0.4964, 0.4952, 0.4964, 0.4952, 0.4940, 0.4929, 0.4941, 0.4929, 0.4941, 0.4929, 0.4941, 0.4930, 0.4941, 0.4930, 0.4942, 0.4930, 0.4942, 0.4931, 0.4942, 0.4931, 0.4943, 0.4931, 0.4943, 0.4932, 0.4943, 0.4932, 0.4943, 0.4955, 0.4966, 0.4977, 0.4989, 0.4978, 0.4989, 0.5000, 0.4989, 0.5000, 0.5011, 0.5000, 0.5011, 0.5000, 0.4989, 0.4978, 0.4967, 0.4978, 0.4989, 0.4978, 0.4967, 0.4957, 0.4968, 0.4978, 0.4968, 0.4957, 0.4968, 0.4979, 0.4989, 0.5000, 0.4989, 0.4979, 0.4968, 0.4958, 0.4968, 0.4958, 0.4969, 0.4958, 0.4969, 0.4958, 0.4948, 0.4938, 0.4948, 0.4959, 0.4948, 0.4938, 0.4949, 0.4939, 0.4949, 0.4959, 0.4969, 0.4959, 0.4970, 0.4960, 0.4949, 0.4940, 0.4950, 0.4960, 0.4950, 0.4960, 0.4950, 0.4960, 0.4950, 0.4940, 0.4950, 0.4941, 0.4951, 0.4941, 0.4931, 0.4941, 0.4932, 0.4922, 0.4932, 0.4942, 0.4951, 0.4961, 0.4952, 0.4961, 0.4971, 0.4981, 0.4971, 0.4981, 0.4990, 0.4981, 0.4971, 0.4962, 0.4953, 0.4962, 0.4972, 0.4962, 0.4972, 0.4981, 0.4991, 0.4981, 0.4991, 0.5000, 0.5009, 0.5000, 0.5009, 0.5000, 0.5009, 0.5000, 0.5009, 0.5000, 0.5009, 0.5000, 0.5009, 0.5000, 0.5009, 0.5000, 0.5009, 0.5000, 0.5009, 0.5000, 0.5009, 0.5018, 0.5027, 0.5018, 0.5027, 0.5018, 0.5027, 0.5018, 0.5027, 0.5018, 0.5027, 0.5018, 0.5026, 0.5018, 0.5026, 0.5018, 0.5026, 0.5035, 0.5044, 0.5035, 0.5043, 0.5052, 0.5061, 0.5069, 0.5078, 0.5086, 0.5095, 0.5086, 0.5094, 0.5103, 0.5111, 0.5102, 0.5094, 0.5085, 0.5093, 0.5102, 0.5093, 0.5084, 0.5093, 0.5084, 0.5092, 0.5084, 0.5092, 0.5084, 0.5075, 0.5083, 0.5092, 0.5083, 0.5075, 0.5066, 0.5058, 0.5066, 0.5058, 0.5049, 0.5057, 0.5049, 0.5057, 0.5065, 0.5073, 0.5065, 0.5073, 0.5081, 0.5089, 0.5097, 0.5105, 0.5113, 0.5121, 0.5113, 0.5104, 0.5112, 0.5104, 0.5112, 0.5104, 0.5096, 0.5103, 0.5111, 0.5103, 0.5095, 0.5103, 0.5095, 0.5102, 0.5094, 0.5102, 0.5094, 0.5102, 0.5109, 0.5117, 0.5109, 0.5117, 0.5109, 0.5116, 0.5124, 0.5131, 0.5139, 0.5146, 0.5138, 0.5146, 0.5153, 0.5161, 0.5153, 0.5145, 0.5152, 0.5160, 0.5152, 0.5159, 0.5152, 0.5144, 0.5136, 0.5143, 0.5151, 0.5158, 0.5150, 0.5142, 0.5150, 0.5142, 0.5134, 0.5142, 0.5134, 0.5126, 0.5134, 0.5126, 0.5133, 0.5126, 0.5118, 0.5125, 0.5118, 0.5125, 0.5117, 0.5110, 0.5102, 0.5109, 0.5102, 0.5095, 0.5087, 0.5080, 0.5072, 0.5080, 0.5087, 0.5079, 0.5072, 0.5079, 0.5072, 0.5079, 0.5086, 0.5093, 0.5086, 0.5078, 0.5071, 0.5078, 0.5085, 0.5092, 0.5085, 0.5092, 0.5085, 0.5092, 0.5085, 0.5077, 0.5070, 0.5063, 0.5070, 0.5077, 0.5084, 0.5091, 0.5097, 0.5090, 0.5083, 0.5076, 0.5069, 0.5062, 0.5055, 0.5062, 0.5055, 0.5062, 0.5069, 0.5062, 0.5055, 0.5062, 0.5055, 0.5061, 0.5054, 0.5061, 0.5054, 0.5047, 0.5054, 0.5061, 0.5054, 0.5061, 0.5067, 0.5074, 0.5067, 0.5074, 0.5067, 0.5074, 0.5080, 0.5087, 0.5080, 0.5073, 0.5080, 0.5086, 0.5080, 0.5073, 0.5066, 0.5059, 0.5053, 0.5046, 0.5053, 0.5059, 0.5052, 0.5059, 0.5065, 0.5072, 0.5065, 0.5072, 0.5065, 0.5072, 0.5078, 0.5084, 0.5078, 0.5084, 0.5078, 0.5084, 0.5090, 0.5097, 0.5090, 0.5096, 0.5090, 0.5083, 0.5090, 0.5096, 0.5102, 0.5108, 0.5102, 0.5108, 0.5114, 0.5120, 0.5114, 0.5120, 0.5114, 0.5107, 0.5101, 0.5107, 0.5101, 0.5107, 0.5113, 0.5119, 0.5113, 0.5119, 0.5112, 0.5118, 0.5124, 0.5130, 0.5124, 0.5130, 0.5136, 0.5142, 0.5136, 0.5129, 0.5123, 0.5117, 0.5111, 0.5117, 0.5110, 0.5104, 0.5098, 0.5092, 0.5098, 0.5104, 0.5097, 0.5103, 0.5109, 0.5115, 0.5109, 0.5115, 0.5121, 0.5115, 0.5120, 0.5126, 0.5120, 0.5126, 0.5132, 0.5138, 0.5132, 0.5125, 0.5131, 0.5125, 0.5119, 0.5125, 0.5119, 0.5125, 0.5130, 0.5124, 0.5130, 0.5136, 0.5142, 0.5135, 0.5141, 0.5147, 0.5141, 0.5147, 0.5141, 0.5135, 0.5140, 0.5134, 0.5140, 0.5134, 0.5128],
            ['Process B (20 Tickets)', 1.0000, 0.5000, 0.6667, 0.5000, 0.4000, 0.3333, 0.2857, 0.2500, 0.2222, 0.3000, 0.3636, 0.3333, 0.3846, 0.3571, 0.4000, 0.3750, 0.4118, 0.4444, 0.4211, 0.4500, 0.4286, 0.4091, 0.3913, 0.4167, 0.4000, 0.3846, 0.3704, 0.3929, 0.3793, 0.3667, 0.3548, 0.3438, 0.3636, 0.3529, 0.3714, 0.3611, 0.3514, 0.3421, 0.3333, 0.3250, 0.3171, 0.3095, 0.3023, 0.2955, 0.2889, 0.3043, 0.3191, 0.3333, 0.3469, 0.3400, 0.3333, 0.3462, 0.3396, 0.3519, 0.3455, 0.3571, 0.3684, 0.3621, 0.3729, 0.3667, 0.3770, 0.3871, 0.3810, 0.3750, 0.3846, 0.3788, 0.3881, 0.3824, 0.3768, 0.3714, 0.3662, 0.3611, 0.3699, 0.3784, 0.3733, 0.3816, 0.3766, 0.3718, 0.3671, 0.3750, 0.3827, 0.3780, 0.3735, 0.3690, 0.3647, 0.3605, 0.3563, 0.3636, 0.3708, 0.3778, 0.3846, 0.3804, 0.3871, 0.3936, 0.3895, 0.3958, 0.3918, 0.3878, 0.3838, 0.3800, 0.3762, 0.3824, 0.3786, 0.3750, 0.3810, 0.3774, 0.3832, 0.3889, 0.3853, 0.3909, 0.3874, 0.3929, 0.3894, 0.3860, 0.3826, 0.3793, 0.3761, 0.3814, 0.3782, 0.3750, 0.3802, 0.3770, 0.3740, 0.3790, 0.3840, 0.3810, 0.3780, 0.3828, 0.3798, 0.3846, 0.3817, 0.3788, 0.3759, 0.3731, 0.3704, 0.3676, 0.3723, 0.3696, 0.3741, 0.3786, 0.3759, 0.3732, 0.3706, 0.3681, 0.3655, 0.3699, 0.3673, 0.3649, 0.3691, 0.3667, 0.3642, 0.3618, 0.3595, 0.3636, 0.3677, 0.3718, 0.3758, 0.3734, 0.3774, 0.3750, 0.3789, 0.3765, 0.3742, 0.3780, 0.3818, 0.3855, 0.3832, 0.3810, 0.3846, 0.3824, 0.3801, 0.3837, 0.3815, 0.3851, 0.3829, 0.3864, 0.3842, 0.3820, 0.3799, 0.3778, 0.3757, 0.3736, 0.3716, 0.3696, 0.3730, 0.3710, 0.3690, 0.3670, 0.3651, 0.3632, 0.3665, 0.3698, 0.3679, 0.3660, 0.3641, 0.3622, 0.3655, 0.3687, 0.3668, 0.3700, 0.3731, 0.3713, 0.3695, 0.3676, 0.3659, 0.3641, 0.3623, 0.3606, 0.3589, 0.3619, 0.3649, 0.3679, 0.3662, 0.3692, 0.3721, 0.3704, 0.3733, 0.3761, 0.3744, 0.3727, 0.3710, 0.3739, 0.3722, 0.3705, 0.3689, 0.3673, 0.3656, 0.3640, 0.3624, 0.3609, 0.3593, 0.3578, 0.3605, 0.3590, 0.3617, 0.3602, 0.3586, 0.3571, 0.3556, 0.3542, 0.3527, 0.3554, 0.3580, 0.3566, 0.3592, 0.3618, 0.3603, 0.3589, 0.3614, 0.3640, 0.3625, 0.3611, 0.3597, 0.3583, 0.3569, 0.3555, 0.3580, 0.3566, 0.3591, 0.3577, 0.3602, 0.3588, 0.3574, 0.3561, 0.3585, 0.3571, 0.3558, 0.3545, 0.3532, 0.3519, 0.3506, 0.3493, 0.3480, 0.3467, 0.3455, 0.3442, 0.3430, 0.3453, 0.3441, 0.3429, 0.3416, 0.3404, 0.3392, 0.3380, 0.3368, 0.3357, 0.3345, 0.3368, 0.3391, 0.3379, 0.3368, 0.3390, 0.3413, 0.3435, 0.3458, 0.3446, 0.3468, 0.3490, 0.3478, 0.3467, 0.3455, 0.3444, 0.3432, 0.3421, 0.3410, 0.3431, 0.3453, 0.3442, 0.3463, 0.3452, 0.3441, 0.3429, 0.3419, 0.3408, 0.3397, 0.3386, 0.3375, 0.3365, 0.3386, 0.3406, 0.3427, 0.3416, 0.3437, 0.3426, 0.3415, 0.3405, 0.3394, 0.3415, 0.3435, 0.3424, 0.3414, 0.3404, 0.3393, 0.3413, 0.3403, 0.3423, 0.3442, 0.3432, 0.3422, 0.3412, 0.3402, 0.3392, 0.3382, 0.3372, 0.3362, 0.3353, 0.3372, 0.3362, 0.3381, 0.3371, 0.3362, 0.3381, 0.3399, 0.3418, 0.3408, 0.3399, 0.3417, 0.3408, 0.3426, 0.3417, 0.3407, 0.3398, 0.3388, 0.3407, 0.3425, 0.3415, 0.3406, 0.3424, 0.3442, 0.3432, 0.3423, 0.3441, 0.3432, 0.3449, 0.3440, 0.3431, 0.3422, 0.3439, 0.3456, 0.3447, 0.3438, 0.3429, 0.3446, 0.3438, 0.3455, 0.3446, 0.3437, 0.3454, 0.3445, 0.3436, 0.3427, 0.3418, 0.3410, 0.3401, 0.3418, 0.3409, 0.3401, 0.3392, 0.3409, 0.3400, 0.3416, 0.3408, 0.3400, 0.3391, 0.3383, 0.3374, 0.3391, 0.3407, 0.3399, 0.3390, 0.3382, 0.3374, 0.3366, 0.3357, 0.3349, 0.3365, 0.3357, 0.3349, 0.3365, 0.3381, 0.3373, 0.3365, 0.3357, 0.3349, 0.3341, 0.3357, 0.3349, 0.3364, 0.3357, 0.3372, 0.3364, 0.3356, 0.3349, 0.3364, 0.3356, 0.3349, 0.3341, 0.3333, 0.3326, 0.3341, 0.3333, 0.3326, 0.3318, 0.3311, 0.3303, 0.3318, 0.3311, 0.3304, 0.3318, 0.3311, 0.3304, 0.3319, 0.3311, 0.3304, 0.3319, 0.3333, 0.3348, 0.3341, 0.3333, 0.3326, 0.3341, 0.3333, 0.3326, 0.3319, 0.3333, 0.3348, 0.3340, 0.3333, 0.3326, 0.3319, 0.3333, 0.3326, 0.3340, 0.3333, 0.3326, 0.3319, 0.3312, 0.3326, 0.3319, 0.3333, 0.3347, 0.3340, 0.3333, 0.3326, 0.3340, 0.3354, 0.3347, 0.3340, 0.3333, 0.3327, 0.3320, 0.3333, 0.3327, 0.3340, 0.3354, 0.3347, 0.3340, 0.3333, 0.3347, 0.3340, 0.3353, 0.3347, 0.3360, 0.3353, 0.3347, 0.3340, 0.3333, 0.3327, 0.3340, 0.3333, 0.3346, 0.3359, 0.3353, 0.3346, 0.3340, 0.3333, 0.3346, 0.3340, 0.3333, 0.3327, 0.3340, 0.3333, 0.3327, 0.3321, 0.3333, 0.3346, 0.3359, 0.3352, 0.3346, 0.3340, 0.3333, 0.3327, 0.3321, 0.3333, 0.3327, 0.3321, 0.3315, 0.3327, 0.3321, 0.3333, 0.3327, 0.3321, 0.3315, 0.3309, 0.3303, 0.3297, 0.3291, 0.3303, 0.3297, 0.3291, 0.3285, 0.3297, 0.3291, 0.3285, 0.3279, 0.3273, 0.3268, 0.3262, 0.3256, 0.3268, 0.3262, 0.3274, 0.3268, 0.3262, 0.3257, 0.3269, 0.3263, 0.3257, 0.3251, 0.3263, 0.3257, 0.3252, 0.3246, 0.3240, 0.3235, 0.3229, 0.3224, 0.3218, 0.3212, 0.3207, 0.3201, 0.3196, 0.3190, 0.3185, 0.3179, 0.3174, 0.3186, 0.3197, 0.3192, 0.3186, 0.3198, 0.3193, 0.3187, 0.3182, 0.3176, 0.3188, 0.3183, 0.3177, 0.3189, 0.3183, 0.3178, 0.3189, 0.3201, 0.3195, 0.3207, 0.3201, 0.3213, 0.3207, 0.3202, 0.3197, 0.3191, 0.3186, 0.3181, 0.3192, 0.3187, 0.3182, 0.3177, 0.3172, 0.3166, 0.3161, 0.3156, 0.3167, 0.3178, 0.3173, 0.3184, 0.3179, 0.3190, 0.3201, 0.3196, 0.3190, 0.3201, 0.3196, 0.3191, 0.3202, 0.3197, 0.3192, 0.3187, 0.3182, 0.3177, 0.3172, 0.3167, 0.3178, 0.3173, 0.3168, 0.3163, 0.3158, 0.3153, 0.3148, 0.3143, 0.3154, 0.3149, 0.3144, 0.3139, 0.3135, 0.3145, 0.3140, 0.3135, 0.3146, 0.3141, 0.3136, 0.3147, 0.3157, 0.3152, 0.3148, 0.3143, 0.3153, 0.3163, 0.3159, 0.3169, 0.3164, 0.3159, 0.3170, 0.3180, 0.3175, 0.3185, 0.3180, 0.3191, 0.3201, 0.3196, 0.3206, 0.3201, 0.3211, 0.3221, 0.3231, 0.3226, 0.3236, 0.3246, 0.3256, 0.3266, 0.3275, 0.3271, 0.3266, 0.3276, 0.3271, 0.3266, 0.3276, 0.3271, 0.3266, 0.3262, 0.3257, 0.3267, 0.3276, 0.3272, 0.3267, 0.3262, 0.3258, 0.3253, 0.3249, 0.3244, 0.3239, 0.3249, 0.3258, 0.3268, 0.3263, 0.3259, 0.3254, 0.3250, 0.3245, 0.3255, 0.3264, 0.3273, 0.3269, 0.3278, 0.3287, 0.3283, 0.3278, 0.3274, 0.3269, 0.3278, 0.3274, 0.3269, 0.3265, 0.3261, 0.3270, 0.3265, 0.3274, 0.3284, 0.3279, 0.3275, 0.3270, 0.3266, 0.3261, 0.3257, 0.3266, 0.3262, 0.3271, 0.3266, 0.3262, 0.3258, 0.3267, 0.3276, 0.3271, 0.3267, 0.3276, 0.3285, 0.3280, 0.3289, 0.3298, 0.3307, 0.3303, 0.3298, 0.3294, 0.3290, 0.3285, 0.3281, 0.3277, 0.3272, 0.3268, 0.3264, 0.3260, 0.3256, 0.3264, 0.3260, 0.3256, 0.3252, 0.3247, 0.3243, 0.3239, 0.3235, 0.3231, 0.3239, 0.3235, 0.3231, 0.3227, 0.3223, 0.3232, 0.3227, 0.3223, 0.3219, 0.3215, 0.3211, 0.3207, 0.3216, 0.3212, 0.3208, 0.3204, 0.3199, 0.3195, 0.3191, 0.3200, 0.3196, 0.3192, 0.3188, 0.3184, 0.3180, 0.3176, 0.3172, 0.3168, 0.3164, 0.3173, 0.3181, 0.3190, 0.3198, 0.3194, 0.3190, 0.3199, 0.3207, 0.3215, 0.3223, 0.3220, 0.3216, 0.3212, 0.3208, 0.3204, 0.3200, 0.3208, 0.3204, 0.3200, 0.3209, 0.3205, 0.3201, 0.3209, 0.3205, 0.3201, 0.3198, 0.3194, 0.3202, 0.3198, 0.3206, 0.3214, 0.3210, 0.3219, 0.3215, 0.3211, 0.3219, 0.3215, 0.3211, 0.3208, 0.3216, 0.3212, 0.3208, 0.3216, 0.3212, 0.3208, 0.3216, 0.3213, 0.3221, 0.3217, 0.3225, 0.323366],
            ['Process C (10 Tickets)', 0.0000, 0.5000, 0.3333, 0.5000, 0.4000, 0.5000, 0.4286, 0.5000, 0.4444, 0.4000, 0.3636, 0.3333, 0.3077, 0.3571, 0.3333, 0.3125, 0.2941, 0.2778, 0.2632, 0.2500, 0.2381, 0.2273, 0.2174, 0.2083, 0.2000, 0.2308, 0.2222, 0.2143, 0.2069, 0.2000, 0.1935, 0.2188, 0.2121, 0.2059, 0.2000, 0.2222, 0.2162, 0.2105, 0.2051, 0.2250, 0.2195, 0.2381, 0.2326, 0.2500, 0.2444, 0.2391, 0.2340, 0.2292, 0.2245, 0.2200, 0.2157, 0.2115, 0.2075, 0.2037, 0.2000, 0.1964, 0.1930, 0.2069, 0.2034, 0.2167, 0.2131, 0.2097, 0.2063, 0.2188, 0.2154, 0.2273, 0.2239, 0.2353, 0.2319, 0.2286, 0.2254, 0.2361, 0.2329, 0.2297, 0.2267, 0.2237, 0.2208, 0.2179, 0.2152, 0.2125, 0.2099, 0.2195, 0.2169, 0.2143, 0.2118, 0.2209, 0.2184, 0.2159, 0.2135, 0.2111, 0.2088, 0.2174, 0.2151, 0.2128, 0.2105, 0.2083, 0.2062, 0.2143, 0.2121, 0.2100, 0.2079, 0.2059, 0.2039, 0.2115, 0.2095, 0.2170, 0.2150, 0.2130, 0.2110, 0.2091, 0.2072, 0.2054, 0.2035, 0.2018, 0.2000, 0.1983, 0.1966, 0.1949, 0.1933, 0.2000, 0.1983, 0.1967, 0.1951, 0.1935, 0.1920, 0.1905, 0.1890, 0.1875, 0.1860, 0.1846, 0.1832, 0.1894, 0.1880, 0.1866, 0.1852, 0.1838, 0.1825, 0.1812, 0.1799, 0.1786, 0.1773, 0.1761, 0.1748, 0.1806, 0.1793, 0.1781, 0.1769, 0.1757, 0.1745, 0.1800, 0.1788, 0.1776, 0.1765, 0.1753, 0.1742, 0.1731, 0.1720, 0.1772, 0.1761, 0.1813, 0.1801, 0.1852, 0.1840, 0.1829, 0.1818, 0.1807, 0.1796, 0.1786, 0.1775, 0.1824, 0.1813, 0.1802, 0.1792, 0.1782, 0.1771, 0.1761, 0.1751, 0.1742, 0.1732, 0.1722, 0.1713, 0.1703, 0.1694, 0.1685, 0.1676, 0.1720, 0.1711, 0.1755, 0.1746, 0.1789, 0.1780, 0.1771, 0.1762, 0.1753, 0.1744, 0.1735, 0.1726, 0.1717, 0.1709, 0.1700, 0.1692, 0.1683, 0.1675, 0.1667, 0.1659, 0.1699, 0.1691, 0.1683, 0.1675, 0.1667, 0.1659, 0.1651, 0.1643, 0.1636, 0.1628, 0.1620, 0.1613, 0.1606, 0.1598, 0.1636, 0.1629, 0.1622, 0.1614, 0.1607, 0.1600, 0.1637, 0.1630, 0.1623, 0.1616, 0.1652, 0.1645, 0.1638, 0.1631, 0.1624, 0.1617, 0.1653, 0.1646, 0.1639, 0.1632, 0.1625, 0.1618, 0.1612, 0.1605, 0.1598, 0.1592, 0.1585, 0.1579, 0.1573, 0.1566, 0.1560, 0.1554, 0.1587, 0.1581, 0.1575, 0.1569, 0.1563, 0.1556, 0.1589, 0.1583, 0.1615, 0.1609, 0.1603, 0.1597, 0.1591, 0.1585, 0.1579, 0.1573, 0.1604, 0.1599, 0.1630, 0.1624, 0.1618, 0.1612, 0.1606, 0.1600, 0.1594, 0.1588, 0.1583, 0.1577, 0.1607, 0.1601, 0.1596, 0.1590, 0.1620, 0.1614, 0.1643, 0.1638, 0.1632, 0.1626, 0.1655, 0.1649, 0.1644, 0.1638, 0.1633, 0.1627, 0.1655, 0.1650, 0.1644, 0.1639, 0.1633, 0.1628, 0.1623, 0.1617, 0.1645, 0.1639, 0.1634, 0.1629, 0.1656, 0.1650, 0.1677, 0.1672, 0.1667, 0.1661, 0.1688, 0.1683, 0.1709, 0.1703, 0.1698, 0.1693, 0.1688, 0.1682, 0.1677, 0.1672, 0.1698, 0.1692, 0.1687, 0.1682, 0.1677, 0.1672, 0.1697, 0.1692, 0.1687, 0.1682, 0.1677, 0.1672, 0.1667, 0.1662, 0.1686, 0.1681, 0.1676, 0.1672, 0.1667, 0.1662, 0.1686, 0.1681, 0.1705, 0.1700, 0.1695, 0.1691, 0.1714, 0.1709, 0.1705, 0.1700, 0.1695, 0.1690, 0.1685, 0.1681, 0.1676, 0.1671, 0.1667, 0.1662, 0.1657, 0.1653, 0.1648, 0.1644, 0.1639, 0.1635, 0.1630, 0.1626, 0.1649, 0.1644, 0.1640, 0.1635, 0.1631, 0.1627, 0.1622, 0.1618, 0.1614, 0.1609, 0.1605, 0.1601, 0.1597, 0.1593, 0.1615, 0.1610, 0.1606, 0.1602, 0.1598, 0.1594, 0.1615, 0.1611, 0.1607, 0.1603, 0.1624, 0.1620, 0.1616, 0.1612, 0.1633, 0.1629, 0.1650, 0.1646, 0.1642, 0.1638, 0.1658, 0.1654, 0.1675, 0.1671, 0.1667, 0.1663, 0.1683, 0.1679, 0.1699, 0.1695, 0.1691, 0.1687, 0.1683, 0.1679, 0.1699, 0.1695, 0.1690, 0.1686, 0.1706, 0.1702, 0.1722, 0.1718, 0.1714, 0.1710, 0.1706, 0.1702, 0.1698, 0.1694, 0.1713, 0.1709, 0.1705, 0.1701, 0.1720, 0.1716, 0.1735, 0.1731, 0.1727, 0.1723, 0.1719, 0.1716, 0.1712, 0.1708, 0.1704, 0.1700, 0.1696, 0.1693, 0.1689, 0.1685, 0.1681, 0.1678, 0.1696, 0.1692, 0.1689, 0.1685, 0.1681, 0.1678, 0.1696, 0.1692, 0.1710, 0.1706, 0.1703, 0.1699, 0.1695, 0.1692, 0.1688, 0.1684, 0.1681, 0.1677, 0.1695, 0.1691, 0.1709, 0.1705, 0.1723, 0.1719, 0.1715, 0.1712, 0.1708, 0.1705, 0.1722, 0.1718, 0.1715, 0.1711, 0.1708, 0.1704, 0.1721, 0.1718, 0.1714, 0.1711, 0.1707, 0.1704, 0.1700, 0.1697, 0.1714, 0.1710, 0.1707, 0.1703, 0.1700, 0.1697, 0.1693, 0.1690, 0.1706, 0.1703, 0.1719, 0.1716, 0.1732, 0.1729, 0.1725, 0.1722, 0.1719, 0.1715, 0.1712, 0.1709, 0.1705, 0.1702, 0.1699, 0.1696, 0.1692, 0.1689, 0.1686, 0.1683, 0.1698, 0.1695, 0.1692, 0.1689, 0.1686, 0.1682, 0.1698, 0.1695, 0.1692, 0.1689, 0.1685, 0.1682, 0.1679, 0.1676, 0.1673, 0.1670, 0.1667, 0.1664, 0.1679, 0.1676, 0.1691, 0.1688, 0.1703, 0.1700, 0.1697, 0.1694, 0.1709, 0.1706, 0.1703, 0.1700, 0.1715, 0.1712, 0.1709, 0.1706, 0.1720, 0.1717, 0.1714, 0.1711, 0.1708, 0.1705, 0.1720, 0.1717, 0.1714, 0.1711, 0.1725, 0.1722, 0.1719, 0.1716, 0.1713, 0.1710, 0.1725, 0.1722, 0.1719, 0.1716, 0.1713, 0.1710, 0.1707, 0.1704, 0.1718, 0.1715, 0.1712, 0.1709, 0.1724, 0.1721, 0.1718, 0.1715, 0.1712, 0.1709, 0.1723, 0.1720, 0.1734, 0.1731, 0.1728, 0.1725, 0.1739, 0.1736, 0.1733, 0.1730, 0.1728, 0.1725, 0.1738, 0.1736, 0.1733, 0.1730, 0.1743, 0.1741, 0.1754, 0.1751, 0.1748, 0.1746, 0.1743, 0.1740, 0.1737, 0.1734, 0.1731, 0.1729, 0.1726, 0.1723, 0.1720, 0.1717, 0.1715, 0.1712, 0.1709, 0.1707, 0.1704, 0.1701, 0.1698, 0.1696, 0.1709, 0.1706, 0.1703, 0.1701, 0.1714, 0.1711, 0.1724, 0.1721, 0.1719, 0.1716, 0.1713, 0.1711, 0.1724, 0.1721, 0.1718, 0.1716, 0.1713, 0.1710, 0.1708, 0.1705, 0.1702, 0.1700, 0.1713, 0.1710, 0.1707, 0.1705, 0.1702, 0.1700, 0.1712, 0.1710, 0.1707, 0.1704, 0.1702, 0.1699, 0.1697, 0.1694, 0.1692, 0.1689, 0.1701, 0.1699, 0.1696, 0.1694, 0.1691, 0.1689, 0.1686, 0.1684, 0.1681, 0.1679, 0.1676, 0.1674, 0.1672, 0.1669, 0.1667, 0.1664, 0.1662, 0.1659, 0.1657, 0.1655, 0.1652, 0.1650, 0.1647, 0.1645, 0.1657, 0.1655, 0.1652, 0.1650, 0.1648, 0.1645, 0.1657, 0.1655, 0.1652, 0.1650, 0.1648, 0.1645, 0.1657, 0.1655, 0.1667, 0.1664, 0.1676, 0.1674, 0.1671, 0.1669, 0.1667, 0.1664, 0.1662, 0.1660, 0.1657, 0.1655, 0.1653, 0.1650, 0.1662, 0.1660, 0.1657, 0.1655, 0.1667, 0.1664, 0.1662, 0.1660, 0.1671, 0.1669, 0.1680, 0.1678, 0.1676, 0.1673, 0.1671, 0.1669, 0.1667, 0.1664, 0.1676, 0.1673, 0.1671, 0.1669, 0.1667, 0.1664, 0.1662, 0.1660, 0.1658, 0.1656, 0.1653, 0.1651, 0.1649, 0.1647, 0.1645, 0.1642, 0.1653, 0.1651, 0.1649, 0.1647, 0.1645, 0.1643, 0.1654, 0.1651, 0.1649, 0.1647, 0.1658, 0.1656, 0.1667, 0.1664, 0.1662, 0.1660, 0.1658, 0.1656, 0.1667, 0.1665, 0.1662, 0.1660, 0.1671, 0.1669, 0.1679, 0.1677, 0.1675, 0.1673, 0.1671, 0.1669, 0.1667, 0.1665, 0.1662, 0.1660, 0.1671, 0.1669, 0.1679, 0.1677, 0.1688, 0.1686, 0.1696, 0.1694, 0.1692, 0.1690, 0.1688, 0.1685, 0.1696, 0.1694, 0.1692, 0.1689, 0.1700, 0.1698, 0.1696, 0.1693, 0.1691, 0.1689, 0.1687, 0.1685, 0.1695, 0.1693, 0.1691, 0.1689, 0.1687, 0.1685, 0.1683, 0.1681, 0.1691, 0.1689, 0.1687, 0.1685, 0.1683, 0.1681, 0.1679, 0.1677, 0.1675, 0.1673, 0.1671, 0.1669, 0.1667, 0.1665, 0.1675, 0.1673, 0.1671, 0.1669, 0.1667, 0.1665, 0.1663, 0.1661, 0.1659, 0.1657, 0.1655, 0.1653, 0.1651, 0.1649, 0.1647, 0.1645, 0.1643, 0.1641, 0.1651, 0.1649, 0.1647, 0.1645, 0.1643, 0.1641, 0.1661]
        ],
        type: 'spline',
        // groups: [
        //     ['Grandchild', 'Child', 'Parent']
        // ]
    },
    point: {
        show: false
    },
    legend: {
        position: 'inset',
        inset: {
            anchor: 'top-right',
        },
    },
    axis: {
        x: {
            label: {
                text: 'Time Slices',
                position: 'outer-right'
            },
            tick: {
                values: [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850],
            },
            padding: {
                left: 5,
                right: 0
            }
        },
        y: {
            label: {
                text: '% Time Slices Received',
                position: 'outer-right'
            },
            tick: {
                format: function(x) {
                    return x * 100 + "% ";
                },
            },
            max: 1,
            min: 0,
            padding: {
                top: 0,
                bottom: 0
            }
        }
    }
});
d3.select('#chart svg').append('text')
    .attr('x', d3.select('#chart svg').node().getBoundingClientRect().width / 2)
    .attr('y', 40)
    .attr('text-anchor', 'middle')
    .style('font-size', '1.4em')
    .text('% Time Slices Received per Concurrent Process');