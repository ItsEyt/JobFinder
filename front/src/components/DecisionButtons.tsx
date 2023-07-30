import React, { useEffect } from "react";
import {useAppDispatch, useAppSelector} from '../../apps/hooks'
import {
	didAccept,
	didReject,
	gotAccept,
	gotReject,
	resetDecision,
} from "../features/DecisionSlice";
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";

const DecisionButtons = () => {
	const dispatch = useAppDispatch();
	const didUserAccept = useAppSelector(didAccept);
	const didUserReject = useAppSelector(didReject);

	
	const handleDecision = (decision: ActionCreatorWithoutPayload<"decisionSlice/gotReject"> | ActionCreatorWithoutPayload<"decisionSlice/gotAccept">) => {
		dispatch(decision());
		setTimeout(()=> dispatch(resetDecision()), 1000);
	};

	return (
		<div className="decision-plate">
			<button
				className={`decision reject`}
				onClick={() => handleDecision(gotReject)}
			>
				X
			</button>
			<button
				className={`decision accept`}
				onClick={() => handleDecision(gotAccept)}
			>
				V
			</button>
		</div>
	);
};

export default DecisionButtons;
